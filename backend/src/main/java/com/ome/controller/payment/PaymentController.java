package com.ome.controller.payment;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

        // CustomUserDetails에 만들어두신 getId() 메소드를 사용합니다.
        Long userId = userDetails.getId(); 

        paymentService.verifyPayment(request, userId);
        
        return ResponseEntity.ok("결제 성공 및 프리미엄 전환이 완료되었습니다.");
    }
}