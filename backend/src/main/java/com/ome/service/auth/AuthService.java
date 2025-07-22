
package com.ome.service.auth;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.header.CacheControlServerHttpHeadersWriter;
import org.springframework.stereotype.Service;

import com.ome.domain.Users;
import com.ome.common.constants.ImageConstants;

import com.ome.common.enums.CreatorStatus;
import com.ome.common.enums.MemberState;
import com.ome.common.enums.Role;
import com.ome.dto.auth.request.LoginRequestDto;
import com.ome.dto.auth.request.SignupRequestDto;
import com.ome.repository.auth.UserRepository;
import com.ome.service.membership.MembershipService;
import com.ome.util.JwtUtil;

// 회원가입 , 로그인 , 로그아웃 , 인증 관련 동작 구현 

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final MembershipService membershipService;
	private final JwtUtil jwtUtil;
	
	// 🔴 회원 가입 
	public void signup(SignupRequestDto dto) {
		
		// 이메일 중복 방지
		if(repository.existsByEmail(dto.getEmail())) {
			throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
		}
		
		// 이메일 형식 검증
		if (!dto.getEmail().contains("@")) {
		    throw new IllegalArgumentException("이메일 형식이 올바르지 않습니다.");
		}

		
		// 아이디 중복 방지
		if ( repository.existsByUserId(dto.getUserId())) {
			throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
		}
		
		// 비밀번호 6자리 이상 검증하기 
		if (dto.getPassword().length() < 6) {
		    throw new IllegalArgumentException("비밀번호는 6자 이상이어야 합니다.");
		}

			
		Role role = Role.USER;
		boolean approved = dto.isApplyAsCreator() ? false : true; // 작가 신청하면 -> 작가 승인이 false로 됨.
		CreatorStatus creatorStatus = dto.isApplyAsCreator() ? CreatorStatus.PENDING : CreatorStatus.APPROVED;
		
		
		// 프로필 이미지 기본 경로 설정
		String profileImageUrl = dto.getProfileImage();
		if (profileImageUrl == null || profileImageUrl.isBlank()) {
		    profileImageUrl = ImageConstants.DEFAULT_PROFILE_IMAGE_URL;; 
		}
		
		Users user = Users.builder()
				.userId(dto.getUserId())
				.username(dto.getUsername())
				.email(dto.getEmail())
				.password(passwordEncoder.encode(dto.getPassword())) // 비밀번호 암호화
				.role(role) // ROLE_USER와 ROLE_CREATOR만 허용
				.approved(approved) // 작가 승인 default 값으로 false 지정
				.creatorStatus(creatorStatus) 
				.profileImage(profileImageUrl) 
				.build();
		

		Users savedUser = repository.save(user); 
		
		// 멤버십 초기화 호출
		if (dto.isApplyAsCreator()) {
			membershipService.createInitialMembership(savedUser.getId(), MemberState.premium);
		} else {
			membershipService.createInitialMembership(savedUser.getId(), MemberState.free);
		}
		
	}
	
	
	
	// 🔴 로그인 
	public String login(LoginRequestDto dto) {
		 
		// 사용자 id 일치 여부 확인
		Users user = repository.findByUserId(dto.getUserId())
				.orElseThrow(()-> new IllegalArgumentException("존재하지 않는 사용자 입니다."));
		 
		// 패스워드 일치하는지 여부 확인 
		if(!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}
		
		// 토큰 생성하기
		return jwtUtil.createToken(user.getUserId(), user.getRole().name());
		
	}
	
	// 🔴 아이디 찾기 
	public Optional<String> findUserIdByEmail(String email) {
		return repository.findByEmail(email).map(Users::getUserId);
	}
	
	// 🔴 비밀번호 초기화 (임시 비밀번호 발급)
	public String resetPassword(String userId , String email) {
		Users user = repository.findByUserId(userId).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 아이디입니다."));
		if(!user.getEmail().equals(email)) {
			throw new IllegalArgumentException("아이디와 이메일 정보가 일치하지 않습니다.");
		}
		
		// 임시 비밀번호 생성 ( 6자리 문자열 )
		String randomPassword = generateRandomPassword(8);
		String encodedPassword = passwordEncoder.encode(randomPassword);
		
		user.setPassword(encodedPassword);
		repository.save(user);
		
		return randomPassword;
	}
	
	// 🔴 비밀번호 랜덤 생성하는 메소드 
	private String generateRandomPassword(int length) {
		String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		StringBuilder sb = new StringBuilder();
		for(int i = 0; i < length; i++) {
			int idx = (int) (Math.random() * chars.length());
			sb.append(chars.charAt(idx));
		}
		return sb.toString();
	}
	
	
	
	//🔴 로그아웃 -> 프론트에서 토큰 삭제 필요..
	public void logout() {
		
	}

}
