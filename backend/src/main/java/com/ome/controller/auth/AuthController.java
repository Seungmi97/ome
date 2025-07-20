package com.ome.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ome.dto.auth.request.LoginRequestDto;
import com.ome.dto.auth.request.SignupRequestDto;
import com.ome.dto.auth.response.LoginResponseDto;
import com.ome.repository.auth.UserRepository;
import com.ome.service.auth.AuthService;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.auth.FileUploadService;
import com.ome.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
// 🌟🌟 회원 가입 , 로그인 , 로그아웃 , 사용자 id 및 이메일 중복 확인 
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") 
@RequiredArgsConstructor
public class AuthController {
	
	private final AuthService authService;
	private final UserRepository userRepository;
	private final FileUploadService fileUploadService;
	private final JwtUtil jwtUtil;
	
	
	// 🔴 프로필 이미지 업로드 api 
	@PostMapping("/upload-profile") 
	public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file)
	{
		String imageUrl = fileUploadService.uploadProfileImage(file);
		return ResponseEntity.ok(imageUrl);
	}
	
	// 🔴 회원 가입 
	@PostMapping("/signup")
	public ResponseEntity<?> singup(@RequestBody SignupRequestDto request) {

		authService.signup(request);
		return ResponseEntity.ok("회원가입 성공");
	}
	
	// 🔴 로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDto request,HttpServletResponse response) {
		String token  = authService.login(request);
		// JWT 토큰을 헤더에 담아 응답하기 
		response.setHeader("Authorization", "Bearer " + token);
		return ResponseEntity.ok(new LoginResponseDto("로그인 성공",token));
	}
	
	// 🔴 아이디 찾기 -> email 파람 값으로 받아 id 찾기
	@GetMapping("/find-id")
	public ResponseEntity<?> findByUserId(@RequestParam String email) {
		return authService.findUserIdByEmail(email)
				.map(userId -> ResponseEntity.ok().body("회원님의 아이디는 : "+ userId +" 입니다."))
				.orElse(ResponseEntity.badRequest().body("해당 이메일로 가입된 아이디가 없습니다."));
	}
	
	// 🔴 비밀번호 초기화 -> 이메일과 아이디를 인증하고나서 임시 비밀번호 발급하기 
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestParam String userId , @RequestParam String  email) {
		try {
			String newPassword = authService.resetPassword(userId, email);
			return ResponseEntity.ok("임시 비밀번호가 발급되었습니다 : " +newPassword);
		}catch(IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	// 🔴 로그아웃 
	@PostMapping("/logout")
	public ResponseEntity<?> logout(@AuthenticationPrincipal CustomUserDetails user, HttpServletResponse response){
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
