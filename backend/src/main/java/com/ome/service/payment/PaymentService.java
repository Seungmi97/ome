package com.ome.service.payment;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ome.dto.payment.request.PaymentVerificationRequest;
import com.ome.service.membership.MembershipService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final MembershipService membershipService;
    private IamportClient iamportClient;

    @Value("${portone.api_key}")
    private String apiKey;

    @Value("${portone.api_secret}")
    private String apiSecret;

    // 프리미엄 멤버십 가격 (예: 9900원). 금액 검증 시 사용됩니다.
    private static final BigDecimal PREMIUM_PRICE = new BigDecimal("9900");

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(apiKey, apiSecret);
    }

    @Transactional
    public void verifyPayment(PaymentVerificationRequest request, Long userId) {
        try {
            // 1. imp_uid로 포트원 서버에 결제 정보 조회 요청
            IamportResponse<Payment> paymentResponse = iamportClient.paymentByImpUid(request.getImp_uid());
            log.info("포트원 결제 정보 조회 성공: {}", paymentResponse.getResponse().toString());

            Payment paymentInfo = paymentResponse.getResponse();

            // 2. 결제 상태 검증
            if (!"paid".equals(paymentInfo.getStatus())) {
                throw new IllegalStateException("결제가 완료되지 않았습니다. 상태: " + paymentInfo.getStatus());
            }

            // 3. 결제 금액 검증
            if (!paymentInfo.getAmount().equals(PREMIUM_PRICE)) {
                throw new IllegalStateException("결제 금액이 상품 가격과 일치하지 않습니다.");
            }

            // 4. 모든 검증 통과 시 멤버십 업그레이드
            membershipService.upgradeMembership(userId);
            log.info("사용자 ID {}의 멤버십이 프리미엄으로 업그레이드되었습니다.", userId);

        } catch (Exception e) {
            log.error("결제 검증 중 심각한 오류 발생", e);
            throw new RuntimeException("결제 검증에 실패했습니다. 관리자에게 문의하세요.", e);
        }
    }
}