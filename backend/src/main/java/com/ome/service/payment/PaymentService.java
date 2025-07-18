package com.ome.service.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ome.common.enums.PaymentType;
import com.ome.domain.Membership;
import com.ome.domain.Payment;
import com.ome.domain.PayppInfo;
import com.ome.domain.Users;
import com.ome.dto.payment.request.PaymentCardRegisterRequest;
import com.ome.dto.payment.request.PaymentVerificationRequest;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.membership.MembershipRepository;
import com.ome.repository.payment.PaymentRepository;
import com.ome.repository.payment.PayppInfoRepository;
import com.ome.service.membership.MembershipService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.request.ScheduleData;
import com.siot.IamportRestClient.request.ScheduleEntry;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Schedule;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final MembershipService membershipService;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final PayppInfoRepository payppInfoRepository;
    private final MembershipRepository membershipRepository;
    private IamportClient iamportClient;

    @Value("${portone.api_key}")
    private String apiKey;

    @Value("${portone.api_secret}")
    private String apiSecret;

    private static final BigDecimal PREMIUM_PRICE = new BigDecimal("9900");

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(apiKey, apiSecret);
    }

    @Transactional
    public void verifyPayment(PaymentVerificationRequest request, Long userId) {
        try {
            IamportResponse<com.siot.IamportRestClient.response.Payment> paymentResponse =
                    iamportClient.paymentByImpUid(request.getImp_uid());

            com.siot.IamportRestClient.response.Payment paymentInfo = paymentResponse.getResponse();
            log.info("포트원 결제 정보 조회 성공: {}", paymentInfo.toString());

            // 1. 결제 상태 검증
            String status = paymentInfo.getStatus();
            switch (status) {
                case "paid":
                    break;
                case "cancelled":
                    throw new IllegalStateException("결제가 취소되었습니다.");
                case "failed":
                    throw new IllegalStateException("결제가 실패했습니다.");
                default:
                    throw new IllegalStateException("알 수 없는 결제 상태입니다: " + status);
            }

            // 2. 금액 검증
            if (!paymentInfo.getAmount().equals(PREMIUM_PRICE)) {
                throw new IllegalStateException("결제 금액이 상품 가격과 일치하지 않습니다.");
            }

            // 3. 중복 결제 방지 (pg_tid 기준)
            if (paymentRepository.findByPgTid(paymentInfo.getPgTid()).isPresent()) {
                throw new IllegalStateException("이미 처리된 결제입니다.");
            }

            // 4. 사용자 조회
            Users user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

            // 5. 결제 정보 저장
            Payment payment = Payment.builder()
            .user(user)
            .paymentType(PaymentType.MEMBERSHIP)
            .amount(paymentInfo.getAmount())
            .method(paymentInfo.getPayMethod())    // 카드, 카카오페이 등
            .status(paymentInfo.getStatus())
            .impUid(paymentInfo.getImpUid())
            .merchantUid(paymentInfo.getMerchantUid())
            .pgTid(paymentInfo.getPgTid())
            .paidAt(paymentInfo.getPaidAt() != null
            ? LocalDateTime.ofInstant(paymentInfo.getPaidAt().toInstant(), ZoneId.systemDefault())
            : null)
            .build();

            paymentRepository.save(payment);
            log.info("결제 이력이 저장되었습니다. pg_tid: {}", paymentInfo.getPgTid());

            // 6. 멤버십 업그레이드
            membershipService.upgradeMembership(userId);
            log.info("사용자 ID {}의 멤버십이 프리미엄으로 업그레이드되었습니다.", userId);

        } catch (Exception e) {
            log.error("결제 검증 중 오류 발생", e);
            throw new RuntimeException("결제 검증에 실패했습니다. 관리자에게 문의하세요.", e);
        }
    }
@Transactional
public void registerCard(PaymentCardRegisterRequest request, Long userId) {
    try {
        // 1. DTO로 받은 impUid를 이용해 포트원에서 인증 결제 내역을 조회
        IamportResponse<com.siot.IamportRestClient.response.Payment> paymentResponse =
                iamportClient.paymentByImpUid(request.getImpUid());

        com.siot.IamportRestClient.response.Payment paymentInfo = paymentResponse.getResponse();

        // 2. 결제 상태가 'paid'(결제완료)인지 확인
        if (!"paid".equals(paymentInfo.getStatus())) {
            throw new IllegalStateException("카드 등록을 위한 인증 결제가 완료되지 않았습니다.");
        }

        // 3. 요청으로 받은 customerUid와 포트원에서 조회한 customerUid가 일치하는지 확인
        if (!request.getCustomerUid().equals(paymentInfo.getCustomerUid())) {
            throw new IllegalStateException("인증된 카드의 사용자 정보가 일치하지 않습니다.");
        }

        // 4. 사용자 조회 및 DB에 빌링키(카드 정보) 저장
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        PayppInfo payppInfo = PayppInfo.builder()
                .user(user)
                .customerUid(paymentInfo.getCustomerUid())
                .cardName(paymentInfo.getCardName())
                .cardNumber(paymentInfo.getCardNumber())
                .build();

        payppInfoRepository.save(payppInfo);
        log.info("정기결제용 카드 등록 완료: customer_uid = {}", request.getCustomerUid());

    } catch (Exception e) {
        log.error("카드 등록 중 오류 발생", e);
        throw new RuntimeException("카드 등록 실패: " + e.getMessage(), e);
    }
}
@Transactional
public void requestRecurringPayment(String customerUid, Long userId) {
    try {
        String merchantUid = "repeat_" + UUID.randomUUID();

        // ScheduleEntry 생성자에 맞게 Date 객체로 변환
        Date scheduleAt = Date.from(
                LocalDateTime.now().plusSeconds(5).toInstant(ZoneOffset.UTC)
        );

        ScheduleEntry entry = new ScheduleEntry(
                merchantUid,
                scheduleAt,
                PREMIUM_PRICE
        );
        entry.setName("프리미엄 멤버십 정기결제");

        // ScheduleData에 entry 추가
        ScheduleData scheduleData = new ScheduleData(customerUid);
        scheduleData.addSchedule(entry);

        // 정기결제 등록 요청
        IamportResponse<List<Schedule>> response = 
        iamportClient.subscribeSchedule(scheduleData); // ✅ 정확하게 수정

        log.info("정기결제 등록 응답: {}", response.getResponse());

    } catch (Exception e) {
        log.error("정기결제 요청 실패", e);
        throw new RuntimeException("정기결제 요청 중 오류가 발생했습니다.", e);
    }
}
@Scheduled(cron = "0 0 1 * * ?") // 매일 새벽 1시 실행
@Transactional
public void scheduleNextRecurringPayments() {
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime threshold = now.plusDays(1); // 하루 내 만료자

    List<Membership> expiringList = membershipRepository.findExpiringSoon(threshold);

    for (Membership membership : expiringList) {
        Long userId = membership.getUser().getId();
        String customerUid = "user_" + userId;

        try {
            requestRecurringPayment(customerUid, userId);
            log.info("다음 정기결제 예약 완료 - userId: {}", userId);
        } catch (Exception e) {
            log.error("정기결제 예약 실패 - userId: {}", userId, e);
        }
    }
}


}
