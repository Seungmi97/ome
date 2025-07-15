package com.ome.service.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.header.CacheControlServerHttpHeadersWriter;
import org.springframework.stereotype.Service;

import com.ome.domain.Users;
import com.ome.domain.Users.Role;
import com.ome.dto.auth.request.LoginRequestDto;
import com.ome.dto.auth.request.SignupRequestDto;
import com.ome.dto.auth.response.SignupResponseDto;
import com.ome.repository.auth.UserRepository;
import com.ome.util.JwtUtil;

// 회원가입 , 로그인 , 로그아웃 , 인증 관련 동작 구현 

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;
	
	// 🔴 회원 가입 
	public SignupResponseDto signup(SignupRequestDto dto) {
		
		// 이메일 중복 방지
		if(repository.existsByEmail(dto.getEmail())) {
			throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
		}
		
		// 아이디 중복 방지
		if ( repository.existsByUserId(dto.getUserId())) {
			throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
		}
		
		Role role = Role.USER;
		boolean approved = true;

		// 작가 신청 시 -> 임시로 user로 표시하고 관리자 승인 대기함.
		if (dto.isApplyAsCreator()) {
			role = Role.USER;       
			approved = false;        
		}
		
		Users user = Users.builder()
				.userId(dto.getUserId())
				.username(dto.getUsername())
				.email(dto.getEmail())
				.password(passwordEncoder.encode(dto.getPassword())) // 비밀번호 암호화
				.role(role) // ROLE_USER와 ROLE_CREATOR만 허용
				.approved(approved) // 작가 승인 default 값으로 false 지정
				.build();
		
		repository.save(user);	
		
		//토큰 생성하기 
		String token = jwtUtil.createToken(user.getUserId(),user.getRole().name());
		return new SignupResponseDto("회원가입 성공", token);
		
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
	
	
	
	//🔴 로그아웃 -> 프론트에서 토큰 삭제 필요..
	public void logout() {
		
	}

}
