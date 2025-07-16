package com.ome.dto.mypage.response;

import java.time.LocalDateTime;

import com.ome.domain.Users;

import lombok.Getter;
//🌟🌟 userService -> 권한 분기를 위해 만든 dto 
// 일반 사용자 dto !!!
@Getter
public class UserMyPageResponseDto {
	private String userId;
	private String username;
	private String role;
	private String email;
	private LocalDateTime createdAt;
	// private List<CreatorSummaryDto> likedCreators; // 찜한 작가들 (🌟🌟다른 팀원이 짠 부분에서 가져오기 )
	
	public UserMyPageResponseDto (Users user) {
		this.userId = user.getUserId();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.createdAt = user.getCreatedAt();
		// this.likedCreator = likedCretors;
	}

}
