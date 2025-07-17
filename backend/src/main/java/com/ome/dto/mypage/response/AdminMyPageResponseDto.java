package com.ome.dto.mypage.response;



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
	
	public AdminMyPageResponseDto(Users user, int totalUsers, int pendingCreators, int approvedCreators) {
		this.userId = user.getUserId();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.totalUsers = totalUsers;
		this.pendingCreators = pendingCreators;
		this.creatorCount = approvedCreators;
	}

}
