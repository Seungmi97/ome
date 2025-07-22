package com.ome.dto.payment.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SubscribeCustomerData {
    private String customer_uid;
    private String card_number;
    private String expiry;
    private String birth;
    private String pwd_2digit;
}
