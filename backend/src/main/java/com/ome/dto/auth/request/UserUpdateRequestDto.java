package com.ome.dto.auth.request;

import lombok.Getter;
// 🌟🌟 UserService에서 내 정보 수정할 때 사용함
@Getter
public class UserUpdateRequestDto {
	
	private String username;
	private String email;
	private String password;

}
