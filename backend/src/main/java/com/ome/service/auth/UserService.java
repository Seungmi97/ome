package com.ome.service.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ome.domain.Users;
import com.ome.dto.auth.request.UserUpdateRequestDto;
import com.ome.dto.auth.response.AdminMyPageResponseDto;
import com.ome.dto.auth.response.CreatorMyPageResponseDto;
import com.ome.dto.auth.response.UserInfoResponseDto;
import com.ome.dto.auth.response.UserMyPageResponseDto;
import com.ome.repository.auth.UserRepository;

import lombok.RequiredArgsConstructor;

// 🌟🌟 마이페이지 , 사용자 정보 조회 / 수정, 탈퇴 등 동작 구현
@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	// 🔴 회원 탈퇴 
	public void deleteUser(String userId) {
		Users user = userRepository.findByUserId(userId)
				.orElseThrow(()-> new RuntimeException("존재하지 않는 사용자입니다."));
		userRepository.delete(user);
	}
	
	//🔴 마이페이지 정보 조회 ( 역할별 분기 )
	public Object getMyPage(String userId) {
		Users user = userRepository.findByUserId(userId)
				.orElseThrow(()-> new RuntimeException("사용자 정볼르 찾을 수 없습니다."));
		
		////List<CreatorSumaryDto> likedCreator = likeService.getLikedCreators(user); // 작가 찜 목록 (추후 팀원 코드 참고하여 수정)
		switch (user.getRole()) {
        case ADMIN:
            return new AdminMyPageResponseDto(user);  // Admin 전용 DTO
        case CREATOR:
            return new CreatorMyPageResponseDto(user); //  (user, likedCreators)
        case USER:
        default:
            return new UserMyPageResponseDto(user); //  (user, likedCreators)
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
			user.setPassword(dto.getPassword());
		}
		
		userRepository.save(user);
	}
}