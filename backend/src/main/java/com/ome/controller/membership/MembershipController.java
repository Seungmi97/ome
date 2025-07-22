package com.ome.controller.membership;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.domain.Users;
import com.ome.dto.membership.request.MembershipCancelRequest;
import com.ome.dto.membership.request.MembershipUpgradeRequest;
import com.ome.dto.membership.response.MembershipResponse;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.membership.MembershipService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/memberships")
@RequiredArgsConstructor
public class MembershipController {

    private final MembershipService membershipService;

    @GetMapping("/me")
    public MembershipResponse getMyMembership(@AuthenticationPrincipal(expression = "user") Users user) {
        return membershipService.getMyMembership(user.getId());
    }

    @PostMapping("/upgrade")
    public void upgradeMembership(@RequestBody MembershipUpgradeRequest request) {
    	membershipService.upgradeMembership(request.getUserId());
    }
    
    @PostMapping("/cancel")
    public void cancelMembership(@RequestBody MembershipCancelRequest request) {
    	membershipService.cancelMembership(request.getUserId());
    }
}
