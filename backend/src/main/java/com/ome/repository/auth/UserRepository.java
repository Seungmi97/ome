
package com.ome.repository.auth;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ome.common.enums.CreatorStatus;
import com.ome.common.enums.Role;
import com.ome.domain.Users;
import com.ome.dto.creator.response.CreatorBookmarkAvgDto;
import com.ome.dto.creator.response.CreatorResponseDto;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
	Optional<Users> findByUserId(String userId);

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
	int countAllUsers(); // 전체 유저 수

	// 멤버쉽 사용자 수 조회 - 관리자 부분
	@Query("SELECT COUNT(u) FROM Users u WHERE u.membership IS NOT NULL")
	int countMembershipUsers();

	// 작가 권한을 가진 사람 수 세기 - 관리자 부분
	int countByRole(Role role);

	// 유저 정보 + 북마크 리스트까지 미리 DB에서 꺼냄
	@EntityGraph(attributePaths = "bookmarks")
	Optional<Users> findWithBookmarksById(Long id);
	
	// 전체 작가 목록 조회
	@Query("SELECT new com.ome.dto.creator.response.CreatorResponseDto(u.id, u.userId, u.username, u.email) " +
		       "FROM Users u WHERE u.role = com.ome.common.enums.Role.CREATOR")
	List<CreatorResponseDto> findAllCreators();
	
	// 작가별 평균 찜수 (총 찜수 ➗ 레시피 수)
	@Query("""
		    SELECT new com.ome.dto.creator.response.CreatorBookmarkAvgDto(
		        u.id, u.username, 
		        CASE WHEN COUNT(r) = 0 THEN 0.0 ELSE (CAST(COUNT(b) AS double) / COUNT(r)) END
		    )
		    FROM Users u
		    LEFT JOIN u.recipes r
		    LEFT JOIN r.bookmarks b
		    WHERE u.role = com.ome.common.enums.Role.CREATOR
		    GROUP BY u.id, u.username
		""") //시피 수가 0인 경우를 대비해서 CASE WHEN COUNT(r) = 0 처리
	List<CreatorBookmarkAvgDto> getCreatorsWithBookmarkAvg();

}