package com.ome.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ome.dto.auth.request.LoginRequestDto;
import com.ome.dto.auth.request.SignupRequestDto;
import com.ome.dto.auth.response.SignupResponseDto;
import com.ome.repository.auth.UserRepository;
import com.ome.service.auth.AuthService;
import com.ome.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
// 🌟🌟 회원 가입 , 로그인 , 로그아웃 , 사용자 id 및 이메일 중복 확인 
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // 🌟🌟🌟 일단 임시 기본 리액트 포트로 지정함 (나중에 맞추기!!)
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;
	private final UserRepository userRepository;
	private final JwtUtil jwtUtil;
	
	// 🔴 회원 가입 
	@PostMapping("/signup")
	public ResponseEntity<?> singup(@RequestBody SignupRequestDto request) {

		SignupResponseDto response = authService.signup(request);
		return ResponseEntity.ok(response);
	}
	
	// 🔴 로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDto request,HttpServletResponse response) {
		String token  = authService.login(request);
		// JWT 토큰을 헤더에 담아 응답하기 
		response.setHeader("Authorization", "Bearer " + token);
		return ResponseEntity.ok("로그인 성공");
	}
	
	// 🔴 로그아웃 
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletResponse response){
		// 클라이언트에서 토큰 제거 필요함 -> 서버는 무상태임 
		response.setHeader("Authorization", null);
		return ResponseEntity.ok("로그아웃 완료");
		
	}
	
	
	//🔴 사용자 id 중복 확인하기 
	@GetMapping("/check-id")
	public ResponseEntity<?> checkUserId(@RequestParam String userId) {
		boolean exists = userRepository.existsByUserId(userId);
		
		if(exists) {
			return ResponseEntity.badRequest().body("이미 사용 중인 아이디입니다.");
		}
		
		return ResponseEntity.ok("사용 가능한 아이디입니다.");
	}
	
	
	// 🔴 이메일 중복 확인하기 
	@GetMapping("/check-email")
	public ResponseEntity<?>  checkEmail(@RequestParam String email){
		boolean exists = userRepository.existsByEmail(email);
		if(exists) {
			return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
		}
		return ResponseEntity.ok("사용 가능한 이메일입니다.");
	}

}
