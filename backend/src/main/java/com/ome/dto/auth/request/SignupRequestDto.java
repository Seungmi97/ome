package com.ome.dto.auth.request;



import com.ome.domain.Users.Role;

import lombok.Getter;

@Getter
public class SignupRequestDto {
	private String userId;
	private String username;
	private String password;
	private String email;
	private Role role;
	

}
