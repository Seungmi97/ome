package com.ome.repository.membership;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ome.domain.Membership;
import com.ome.domain.Users;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    // 사용자 기준으로 멤버십 조회
    Optional<Membership> findByUser(Users user);

    // 또는 userId 기준 조회도 가능
    Optional<Membership> findByUserId(Long userId);
}
