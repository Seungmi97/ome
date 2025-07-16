package com.ome.dto.auth.response;

import java.time.LocalDateTime;

import com.ome.domain.Users;

import lombok.Getter;

// 🌟🌟 UserService 에서 사용자 정보 조회 시 사용
@Getter
public class UserInfoResponseDto {
	
	private String userId;
	private String username;
	private String email;
	private String role;
	private Boolean approved;
	private LocalDateTime createdAt;
	
	public UserInfoResponseDto(Users user) {
		this.userId = user.getUserId();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.role = user.getRole().name();
		this.approved = user.isApproved();
		this.createdAt = user.getCreatedAt();
		
	}

}
