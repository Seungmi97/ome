package com.ome.service.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ome.common.enums.Role;
import com.ome.domain.Users;
import com.ome.dto.auth.request.LoginRequestDto;
import com.ome.dto.auth.request.SignupRequestDto;
import com.ome.repository.auth.UserRepository;
import com.ome.service.membership.MembershipService;
import com.ome.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final MembershipService membershipService;
	private final JwtUtil jwtUtil;
	
	// 🔴 회원 가입 
	@Transactional
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

		
		Users user = Users.builder()
				.userId(dto.getUserId())
				.username(dto.getUsername())
				.email(dto.getEmail())
				.password(passwordEncoder.encode(dto.getPassword())) // 비밀번호 암호화
				.role(role) // ROLE_USER와 ROLE_CREATOR만 허용
				.approved(approved) // 작가 승인 default 값으로 false 지정
				.build();
				
		
		Users savedUser = repository.save(user); 
        membershipService.createDefaultMembership(savedUser.getId());
		
	}
	
	
	
	// 🔴 로그인 
	public String login(LoginRequestDto dto) {
		 
		// 사용자 id 일치 여부 확인
		Users user = repository.findByUserId(dto.getUserId())
				.orElseThrow(()-> new IllegalArgumentException("존재하지 않는 사용자 입니다."));
		 System.out.println("DB 비번: " + user.getPassword());
		// 패스워드 일치하는지 여부 확인 
		if(!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
			throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
		}
		
		// 토큰 생성하기
		return jwtUtil.createToken(user.getUserId(), user.getRole().name());
		
	}
	
	
	
	//🔴 로그아웃 -> 프론트에서 토큰 삭제 필요..
	public void logout() {
		
	}

}
