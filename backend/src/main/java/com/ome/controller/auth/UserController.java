package com.ome.controller.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.dto.auth.request.UserUpdateRequestDto;
import com.ome.dto.auth.response.UserInfoResponseDto;
import com.ome.service.auth.UserService;
import com.ome.util.JwtUtil;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // 🌟🌟🌟 일단 임시 기본 리액트 포트로 지정함 (나중에 맞추기!!)
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final JwtUtil jwtUtil;
	
	
	//  🔴 사용자 정보 조회하기 
	@GetMapping("/users/me")
	public UserInfoResponseDto getUserInfo(HttpServletRequest request) {
		String token = jwtUtil.resolveToken(request);
		String userId = jwtUtil.getUserId(token);
		
		return userService.getUserInfo(userId);
	}
	
	// 🔴 사용자 정보 수정하기 
	@PutMapping("/users/me")
	public void updateUserInfo(HttpServletRequest reuqest, @RequestBody UserUpdateRequestDto dto) {
		String token = jwtUtil.resolveToken(reuqest);
		String userId = jwtUtil.getUserId(token);
		
		userService.updateUser(userId, dto);
	}
	
	
	// 🔴 마이페이지 정보 조회하기 
	@GetMapping("/mypage")
	public Object getMyPage(HttpServletRequest reuqest) {
		String token = jwtUtil.resolveToken(reuqest);
		String userId = jwtUtil.getUserId(token);
	
		return userService.getMyPage(userId);
		
	}
	
	//🔴 회원 탈퇴 
	@DeleteMapping("/users")
	public void deleteUser(HttpServletRequest request) {
		String token = jwtUtil.resolveToken(request);
		String userId = jwtUtil.getUserId(token);
		
		userService.deleteUser(userId);
	}


}
