package com.ome.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ome.common.enums.Role;
import com.ome.domain.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    // 승인된 작가 목록 가져오기
    List<Users> findAllByRoleAndApprovedTrue(Role role);
}
