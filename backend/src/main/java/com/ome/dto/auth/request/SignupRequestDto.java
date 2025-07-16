package com.ome.dto.auth.request;




import lombok.Getter;

@Getter
public class SignupRequestDto {
	private String userId;
	private String username;
	private String password;
	private String email;
	private boolean applyAsCreator;

}
