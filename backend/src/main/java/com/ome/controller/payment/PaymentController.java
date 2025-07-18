package com.ome.controller.payment;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.dto.payment.request.PaymentCardRegisterRequest;
import com.ome.dto.payment.request.PaymentVerificationRequest;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.payment.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @RequestBody PaymentVerificationRequest request,
            // 👇 UserDetailsImpl을 CustomUserDetails로 변경합니다.
            @AuthenticationPrincipal CustomUserDetails userDetails) { 

        // CustomUserDetails에 getId() 메소드를 사용합니다.
        Long userId = userDetails.getId(); 

        paymentService.verifyPayment(request, userId);
        
        return ResponseEntity.ok("결제 성공 및 프리미엄 전환이 완료되었습니다.");
    }

    @PostMapping("/register-card")
    public ResponseEntity<String> registerCard(
    @RequestBody PaymentCardRegisterRequest request,
    @AuthenticationPrincipal CustomUserDetails userDetails) {

    paymentService.registerCard(request, userDetails.getId());
    return ResponseEntity.ok("카드 등록 및 빌링키 저장 완료");
}
 @PostMapping("/subscribe")
    public ResponseEntity<String> requestRecurringPayment(
            @RequestBody PaymentCardRegisterRequest request, // ⭐ 이 DTO를 사용!
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        // ⭐ request.getCustomerUid()로 값을 가져옵니다.
        // PaymentCardRegisterRequest는 impUid 필드도 가지고 있지만,
        // 이 API에서는 customerUid만 사용하고 impUid는 무시됩니다.
        paymentService.requestRecurringPayment(request.getCustomerUid(), userDetails.getId());
        return ResponseEntity.ok("정기결제 요청 완료");
    }
}