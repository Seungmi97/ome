
package com.ome.dto.mypage.response;

import java.time.LocalDateTime;

import com.ome.common.enums.Role;
import com.ome.domain.Users;

import lombok.Getter;
//🌟🌟 userService -> 권한 분기를 위해 만든 dto 
// 일반 사용자 dto !!!
@Getter
public class UserMyPageResponseDto {
	private String userId;
	private String username;
	private String email;
	private Role role;
	private int bookmarkCount;
	private LocalDateTime createdAt;
	
	
	public UserMyPageResponseDto (Users user, int bookmarkCount) {
		this.userId = user.getUserId();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.role=user.getRole();
		this.bookmarkCount = bookmarkCount;
		this.createdAt = user.getCreatedAt();
		
	}

}
