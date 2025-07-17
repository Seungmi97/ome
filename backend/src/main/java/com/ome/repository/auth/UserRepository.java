package com.ome.repository.auth;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ome.common.enums.CreatorStatus;
import com.ome.common.enums.Role;
import com.ome.domain.Users;



@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
	Optional<Users> findByUserId( String userId);
	Optional<Users> findByEmail(String email);
	boolean existsByUserId(String userId);
	boolean existsByEmail(String email);
	
	
	
    // 승인된 작가 목록 가져오기
	@Query("SELECT u FROM Users u WHERE u.role = 'CREATOR' AND u.approved = true AND (" +
		       "u.userId LIKE :keyword OR " +
		       "u.username LIKE :keyword OR " +
		       "u.email LIKE :keyword)")
	Page<Users> searchApprovedCreators(@Param("keyword") String keyword, Pageable pageable);

    
    // 작가 신청 목록 가져오기 - 관리자 부분
	@Query("SELECT u FROM Users u WHERE u.creatorStatus = 'PENDING' AND (" +
		       "u.userId LIKE :keyword OR " +
		       "u.username LIKE :keyword OR " +
		       "u.email LIKE :keyword)")
	Page<Users> searchPendingCreators(@Param("keyword") String keyword, Pageable pageable);

    
	// 사용자 전체 목록 가져오기  
	@Query("SELECT u FROM Users u WHERE " +
		       "u.userId LIKE :keyword OR " +
		       "u.username LIKE :keyword OR " +
		       "u.email LIKE :keyword")
	Page<Users> searchUsersByKeyword(@Param("keyword") String keyword, Pageable pageable);

    
	int countByCreatorStatus(CreatorStatus status);
	
	@Query("SELECT COUNT(u) FROM Users u")
	int countAllUsers();  // 전체 유저 수
	
	// 작가 권한을 가진 사람 수 세기 - 관리자 부분
	int countByRole(Role role);
	
	


}
