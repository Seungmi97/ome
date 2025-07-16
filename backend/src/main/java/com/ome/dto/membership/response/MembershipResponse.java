package com.ome.dto.membership.response;

import java.time.LocalDateTime;

import com.ome.common.enums.MemberState;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MembershipResponse {
    private MemberState memberState;
    private LocalDateTime expiredAt;
}
