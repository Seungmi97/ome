package com.ome.controller.admin;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ome.MyOmePlatformApplication;
import com.ome.dto.admin.request.UserDto;
import com.ome.service.admin.AdminService;
import com.ome.service.auth.CustomUserDetails;
import com.ome.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUserController {

    private final MyOmePlatformApplication myOmePlatformApplication;
	
	private final AdminService adminService;
 
	
	// 🔴 작가 신청 목록 조회하기 & 필터링 검색 ( 페이징 처리 )
	@GetMapping("/creators")
	public ResponseEntity<Page<UserDto>> getPendingCreators(
	        @RequestParam(defaultValue = "") String keyword,
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        @AuthenticationPrincipal CustomUserDetails userDetails) {
	    return ResponseEntity.ok(adminService.getPendingCreators(keyword, page, size));
	}
	
	// 🔴 작가 전체 목록 & 필터링 검색 ( 페이징 처리 )
	@GetMapping("/creators/all")
	public ResponseEntity<Page<UserDto>> getAllCreators(
	        @RequestParam(defaultValue = "") String keyword,
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        @AuthenticationPrincipal CustomUserDetails userDetails) {
	    return ResponseEntity.ok(adminService.getAllCreators(keyword, page, size));
	}
	
	
	// 🔴 작가 승인하기 
	@PostMapping("/creators/{userId}/approve")
	public ResponseEntity<String> approveCreator(@PathVariable String userId, @AuthenticationPrincipal CustomUserDetails userDetails ) {
		adminService.approveCreator(userId);
		return ResponseEntity.ok("작가 승인 완료");
	}
	
	
	// 🔴 작가 승인 거절하기 
	@PostMapping("/creators/{userId}/reject")
	public ResponseEntity<String> rejectCreator(@PathVariable String userId, @AuthenticationPrincipal CustomUserDetails userDetails) {
		adminService.rejectCreator(userId);
		return ResponseEntity.ok("작가 승인 거절");
	}
	
	
	//🔴 전체 회원 조회하기 & 필터링 검색 ( 페이징 처리 ) 
	@GetMapping("/users")
	public ResponseEntity<Page<UserDto>> getAllUsers(@RequestParam(defaultValue="")String keyword,@RequestParam(defaultValue="0") int page , @RequestParam(defaultValue="10") int size,@AuthenticationPrincipal CustomUserDetails userDetails) {
		return ResponseEntity.ok(adminService.getAllUsers(keyword, page, size));
	}
		
		
	// 🔴 회원 강제 탈퇴시키기 
	@DeleteMapping("/users/{userId}/delete")
	public ResponseEntity<String> deleteUser(@PathVariable String userId,@AuthenticationPrincipal CustomUserDetails userDetails) {
		adminService.deleteUserHard(userId);
		return ResponseEntity.ok("회원 강제 탈퇴 완료");
	}

}
