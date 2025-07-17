package com.ome.service.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import com.ome.common.enums.CreatorStatus;
import com.ome.common.enums.Role;
import com.ome.domain.Users;
import com.ome.dto.admin.request.UserDto;
import com.ome.repository.auth.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
	private final UserRepository userRepository;
	
	////////////////////////
	//✅ 통계 메소드 추가 -> 마이페이지 분기 시 사용할 메소드임 
	//🌟 전체 회원 수 
	public int getTotalUsers() {
		return (int) userRepository.count();
	}
	
	//🌟 승인 대기 작가 수 
	public int getpendingCreators() {
		return userRepository.countByCreatorStatus(CreatorStatus.PENDING);
	}
	
	//🌟 승인 완료 작가 수 
	public int getCountByRole() {
		return userRepository.countByRole(Role.CREATOR);
	}
	////////////////////////
	
	
	// 🔴 작가 승인하기 
	@Transactional
	public void approveCreator(String userId) {
		Users user = userRepository.findByUserId(userId)
				.orElseThrow(()-> new RuntimeException("사용자를 찾을 수 없습니다. userId: "+userId));
		
		/// 일반 사용자인 경우는 작가 승인을 못하게 설정함!!
		if (user.getCreatorStatus() != CreatorStatus.PENDING) {
	        throw new IllegalStateException("작가 승인 대상이 아닙니다. 현재 상태: " + user.getCreatorStatus());
	    }
		
		user.setCreatorStatus(CreatorStatus.APPROVED);
		user.setRole(Role.CREATOR);
		user.setApproved(true);
	}
	
	//🔴 작가 승인 거절하기 
	@Transactional
	public void rejectCreator(String userId) {
		Users user = userRepository.findByUserId(userId)
				.orElseThrow(()-> new RuntimeException("사용자를 찾을 수 없습니다. userId: "+userId));
		
		/// 일반 사용자인 경우는 작가 승인을 못하게 설정함!!
				if (user.getCreatorStatus() != CreatorStatus.PENDING) {
			        throw new IllegalStateException("작가 승인 대상이 아닙니다. 현재 상태: " + user.getCreatorStatus());
			    }
		
		user.setCreatorStatus(CreatorStatus.REJECTED);
		user.setApproved(false);
	}
	
	
	

	// 🔴 관리자 회원 강제 탈퇴하기 -> hard delete 사용!!
	@Transactional
	public void deleteUserHard(String userId) {
		Users user = userRepository.findByUserId(userId)
				.orElseThrow(()-> new RuntimeException("삭제할 사용자가 없습니다."));
		userRepository.delete(user);
	}
	
	
	
	//🔴 사용자 전체 목록 조회하기 (키워드 검색 포함 + 페이징 처리) 
	public Page<UserDto> getAllUsers(String keyword, int page , int size) {
		Pageable pageable = PageRequest.of(page, size);
		 String pattern = "%" + keyword + "%";
		return userRepository.searchUsersByKeyword(pattern, pageable).map(UserDto::from);
	}
	
	
	
	// 🔴 작가 전체 목록 조회하시 (키워드 검색 포함  + 페이징 처리 ) 
	public Page<UserDto> getAllCreators(String keyword, int page, int size) {
		Pageable pageable = PageRequest.of(page , size);
		 String pattern = "%" + keyword + "%";
		return userRepository.searchApprovedCreators( pattern, pageable)
				.map(UserDto::from);
	}
	
	
	// 🔴 작가 신청한 목록 전체 조회하기 (키워드 검색 포함 + 페이징 처리 ) 
	public Page<UserDto> getPendingCreators(String keyword, int page, int size) {
	    Pageable pageable = PageRequest.of(page, size);
	    String pattern = "%" + keyword + "%";
	    return userRepository.searchPendingCreators( pattern, pageable)
	                         .map(UserDto::from);
	}

}
