package com.ome.service.membership;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ome.common.enums.MemberState;
import com.ome.domain.Membership;
import com.ome.domain.Users;
import com.ome.dto.membership.response.MembershipResponse;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.membership.MembershipRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final UserRepository userRepository;

    // ✅ 회원가입 이후 기본 멤버십 생성
    @Transactional
    public void createDefaultMembership(Long userId) {
        if (membershipRepository.existsByUserId(userId)) return;

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        Membership membership = Membership.builder()
                .user(user)
                .memberState(MemberState.free)
                .updatedAt(LocalDateTime.now())
                .build();

        membershipRepository.save(membership);
    }

    // ✅ 내 멤버십 정보 조회
    public MembershipResponse getMyMembership(Long userId) {
        Membership membership = membershipRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("멤버십 정보가 없습니다."));

        return MembershipResponse.builder()
                .memberState(membership.getMemberState())
                .expiredAt(membership.getExpiredAt())
                .build();
    }

    // ✅ 업그레이드: premium 전환
    @Transactional
    public void upgradeMembership(Long userId) {
        Membership membership = membershipRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("멤버십 정보가 없습니다."));

        membership.setMemberState(MemberState.premium);
        membership.setUpdatedAt(LocalDateTime.now());
        membership.setExpiredAt(LocalDateTime.now().plusDays(30));

        membershipRepository.save(membership);
    }

    // ✅ 해지 신청
    @Transactional
    public void cancelMembership(Long userId) {
        Membership membership = membershipRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("멤버십 정보가 없습니다."));

        membership.setMemberState(MemberState.free);
        membership.setUpdatedAt(LocalDateTime.now());
        membership.setExpiredAt(null);

        membershipRepository.save(membership);
    }
}
