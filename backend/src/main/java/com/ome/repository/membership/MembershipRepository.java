package com.ome.repository.membership;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ome.domain.Membership;
import com.ome.domain.Users;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Long> {
    // 사용자 기준으로 멤버십 조회
    Optional<Membership> findByUser(Users user);

    // 또는 userId 기준 조회도 가능
    Optional<Membership> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
    @Query("SELECT m FROM Membership m WHERE m.memberState = 'premium' AND m.expiredAt <= :threshold")
    List<Membership> findExpiringSoon(@Param("threshold") LocalDateTime threshold);

    List<Membership> findByMemberStateAndExpiredAtBefore(String memberState, LocalDateTime time);

}
