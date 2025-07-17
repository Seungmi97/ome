package com.ome.service.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ome.common.enums.PaymentType;
import com.ome.domain.Payment;
import com.ome.domain.Users;
import com.ome.dto.payment.request.PaymentVerificationRequest;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.payment.PaymentRepository;
import com.ome.service.membership.MembershipService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;

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
}
