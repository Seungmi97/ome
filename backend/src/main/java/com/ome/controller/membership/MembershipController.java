package com.ome.controller.membership;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ome.dto.membership.request.MembershipCancelRequest;
import com.ome.dto.membership.request.MembershipUpgradeRequest;
import com.ome.dto.membership.response.MembershipResponse;
import com.ome.service.membership.MembershipService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/memberships")
@RequiredArgsConstructor
public class MembershipController {

    private final MembershipService membershipService;

    @GetMapping("/me")
    public MembershipResponse getMyMembership(@RequestParam Long userId) {
        // ⚠️ 추후에는 JWT에서 userId 추출하는 방식으로 변경 가능
        return membershipService.getMyMembership(userId);
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
