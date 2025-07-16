package com.ome.dto.payment.request;

import lombok.Data;

@Data
public class PaymentVerificationRequest {
    private String imp_uid;      // 포트원 결제 고유번호 (필수)
    private String merchant_uid; // 우리 시스템의 주문번호 (필수)
}