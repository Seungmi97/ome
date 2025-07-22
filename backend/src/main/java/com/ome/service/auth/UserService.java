
package com.ome.service.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ome.common.enums.CreatorStatus;
import com.ome.common.enums.Role;
import com.ome.domain.Users;
import com.ome.dto.auth.request.UserUpdateRequestDto;
import com.ome.dto.auth.response.UserInfoResponseDto;
import com.ome.dto.mypage.response.AdminMyPageResponseDto;
import com.ome.dto.mypage.response.CreatorMyPageResponseDto;
import com.ome.dto.mypage.response.UserMyPageResponseDto;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.bookmark.BookmarkRepository;
import com.ome.repository.recipe.RecipeRepository;
import com.ome.service.qna.QuestionService;
import com.ome.service.review.ReviewService;

import lombok.RequiredArgsConstructor;

// 🌟🌟 마이페이지 , 사용자 정보 조회 / 수정, 탈퇴 등 동작 구현
@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final RecipeRepository recipeRepository;
	private final PasswordEncoder passwordEncoder;
	private final BookmarkRepository bookmarkRepository;
	private final QuestionService questionService;
	private final ReviewService reviewService;
	
	// 🔴 회원 탈퇴 
	public void deleteUser(String userId) {
		Users user = userRepository.findByUserId(userId)
				.orElseThrow(()-> new RuntimeException("존재하지 않는 사용자입니다."));
		questionService.deleteAllQuestionsByUser(user);
		reviewService.deleteAllReviewsByUser(user);
		userRepository.delete(user);
	}
	
	//🔴 마이페이지 정보 조회 ( 역할별 분기 )
	public Object getMyPage(String userId) {
		 Users baseUser = userRepository.findByUserId(userId)
			        .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));
		Long id = baseUser.getId();
		Users user = userRepository.findWithBookmarksById(id)
				.orElseThrow(()-> new RuntimeException("사용자 정보를 찾을 수 없습니다."));
		
		int recipeCount = recipeRepository.countByWriter_UserId(userId); 
		////List<CreatorSumaryDto> likedCreator = likeService.getLikedCreators(user); // 작가 찜 목록 (추후 팀원 코드 참고하여 수정)
		switch (user.getRole()) {
		// 🌟 관리자일 경우 -> 총 사용자 수 , 작가 신청 수 , 작가 수 
        case ADMIN:
        	int totalUsers = userRepository.countAllUsers();
        	int pending = userRepository.countByCreatorStatus(CreatorStatus.PENDING);
			int approved = userRepository.countByRole(Role.CREATOR);
			int membershipCount = userRepository.countMembershipUsers();
            return new AdminMyPageResponseDto(user, totalUsers, pending , approved,membershipCount);  // Admin 전용 DTO
        // 🌟 작가일 경우 -> 찜 수 , 구독자 목록 수 , 내가 올린 레시피 수
        case CREATOR:
        	// 북마크 수
        	int totalLikes = bookmarkRepository.countByRecipe_Writer_UserId(userId);

        	// 구독 시스템 나중에 연결 필요
        	int subscriberCount = 0;
            return new CreatorMyPageResponseDto(user, subscriberCount,recipeCount , totalLikes); 
        case USER:
        default:
        	int bookmarkCount = user.getBookmarks().size();
            return new UserMyPageResponseDto(user, bookmarkCount); //  (user, likedCreators)
    }
	}
	
	//🔴 회원 정보 조회
	public UserInfoResponseDto getUserInfo(String userId) {
		Users user = userRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));
		return new UserInfoResponseDto(user);
	}
	
	// 🔴 회원 정보 수정
	public void updateUser(String userId , UserUpdateRequestDto dto) {
		Users user = userRepository.findByUserId(userId)
				.orElseThrow(()->new RuntimeException("사용자 정보를 찾을 수 없습니다."));
		
		// 이름 비어있지 않은 경우 null 값이 아닐 경우 입력 받은 이름으로 수정
		if (dto.getUsername() != null && !dto.getUsername().isBlank()) {
			user.setUsername(dto.getUsername());
		}
		
		// 이메일이 비어있지 않고 null 값이 아닐 경우 입력 받은 이메일로 수정
		if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
			user.setEmail(dto.getEmail());
		}
		
		// 비밀번호 비어있지 않고 null 값이 아닐 경우 입력 받은 이메일로 수정 
		if(dto.getPassword() != null && !dto.getPassword().isBlank()) {
			String encodedPassword = passwordEncoder.encode(dto.getPassword());
			user.setPassword(encodedPassword);
		}
		
		userRepository.save(user);
	}

}