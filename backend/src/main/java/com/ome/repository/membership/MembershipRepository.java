package com.ome.repository.membership;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ome.domain.Membership;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    boolean existsByUser_Id(Long userId);
    Optional<Membership> findByUser_Id(Long userId);
}
