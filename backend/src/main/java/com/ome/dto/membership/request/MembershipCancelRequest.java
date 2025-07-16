package com.ome.dto.membership.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MembershipCancelRequest {
    private Long userId;
}
