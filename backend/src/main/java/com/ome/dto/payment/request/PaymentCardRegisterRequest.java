package com.ome.dto.payment.request;

import lombok.Getter;

@Getter
public class PaymentCardRegisterRequest {
    private String impUid;
    private String customerUid;
}