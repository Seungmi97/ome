package com.ome.dto.mypage.response;



import com.ome.domain.Users;

import lombok.Getter;

//🌟🌟 UserService -> 권한에 따른 마이페이지 분기 
// 작가 마이페이지 dto !!!
@Getter
public class CreatorMyPageResponseDto {
	
	private String userId;
	private String username;
	private String email;
	private int subscriberCount;
	private int recipeCount;
	private int likeCount;
	
	public CreatorMyPageResponseDto (Users user, int subscriberCount , int recipeCount, int likeCount) {
		this.userId = user.getUserId();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.subscriberCount = subscriberCount;
		this.recipeCount = recipeCount;
		this.likeCount = likeCount;
	}

}
