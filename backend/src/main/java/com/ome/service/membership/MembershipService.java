package com.ome.service.membership;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;

import com.ome.domain.MemberState;
import com.ome.domain.Membership;
import com.ome.dto.membership.response.MembershipResponse;
import com.ome.repository.membership.MembershipRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;

    // 🔜 UserRepository는 추후 연결
    // private final UserRepository userRepository;

    public void createDefaultMembership(Long userId) {
        if (membershipRepository.existsByUser_Id(userId)) return;

        // 아직 User 엔티티 없음 → 임시 로직으로 대체
        throw new UnsupportedOperationException("User 도메인 구현 후 이 메서드를 완성하세요.");
    }
    public MembershipResponse getMyMembership(Long userId) {
        Membership membership = membershipRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("멤버십 정보가 없습니다."));

        return MembershipResponse.builder()
                .memberState(membership.getMemberState())
                .expiredAt(membership.getExpiredAt())
                .build();
    }
    public void upgradeMembership(Long userId) {
    Membership membership = membershipRepository.findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("멤버십 정보가 없습니다."));

    membership.setMemberState(MemberState.premium);
    membership.setUpdatedAt(LocalDateTime.now());
    membership.setExpiredAt(LocalDateTime.now().plus(30, ChronoUnit.DAYS));

    membershipRepository.save(membership);
}
public void cancelMembership(Long userId) {
    Membership membership = membershipRepository.findByUserId(userId)
            .orElseThrow(() -> new IllegalArgumentException("멤버십 정보가 없습니다."));

    membership.setMemberState(MemberState.free);
    membership.setExpiredAt(null);  // 프리멤버는 만료일 없음
    membership.setUpdatedAt(LocalDateTime.now());

    membershipRepository.save(membership);
}
}
