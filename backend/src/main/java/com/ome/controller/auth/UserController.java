package com.ome.controller.auth;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.dto.auth.request.UserUpdateRequestDto;
import com.ome.dto.auth.response.UserInfoResponseDto;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.auth.UserService;
import com.ome.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    private final JwtUtil jwtUtil;
    
    
    //  🔴 사용자 정보 조회하기 
    @GetMapping("/users/me")
    public UserInfoResponseDto getUserInfo(@AuthenticationPrincipal CustomUserDetails user) {
        
        return userService.getUserInfo(user.getUser().getUserId());
    }
    
    // 🔴 사용자 정보 수정하기 
    @PutMapping("/users/me")
    public void updateUserInfo(@AuthenticationPrincipal CustomUserDetails user, @RequestBody UserUpdateRequestDto dto) {
        
        userService.updateUser(user.getUser().getUserId(), dto);
    }
    
    
    // 🔴 마이페이지 정보 조회하기 
    @GetMapping("/mypage")
    public Object getMyPage(@AuthenticationPrincipal CustomUserDetails user) {
        
        return userService.getMyPage(user.getUser().getUserId());
        
    }
    
    //🔴 회원 탈퇴 
    @DeleteMapping("/users")
    public void deleteUser(@AuthenticationPrincipal CustomUserDetails user) {
        
        userService.deleteUser(user.getUser().getUserId());
    }


}