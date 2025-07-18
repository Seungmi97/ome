
package com.ome.dto.mypage.response;



import java.time.LocalDateTime;

import com.ome.common.enums.Role;
import com.ome.domain.Users;

import lombok.Getter;

//🌟🌟 UserService -> 권한에 따른 마이페이지 분기 
//관리자 마이페이지 dto !!!
@Getter
public class AdminMyPageResponseDto {
	private String userId;
	private String username;
	private String email;
	private int totalUsers;
	private int pendingCreators;
	private int creatorCount;
	 private int membershipCount;
	private Role role;
	private LocalDateTime createdAt;
	
	public AdminMyPageResponseDto(Users user, int totalUsers, int pendingCreators, int approvedCreators, int membershipCount) {
		this.userId = user.getUserId();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.totalUsers = totalUsers;
		this.pendingCreators = pendingCreators;
		this.creatorCount = approvedCreators;
		this.membershipCount = membershipCount; 
		this.role=user.getRole();
		this.createdAt = user.getCreatedAt();
	}

}
