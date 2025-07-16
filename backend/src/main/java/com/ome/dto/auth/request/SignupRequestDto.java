package com.ome.dto.auth.request;




import lombok.Getter;

@Getter
public class SignupRequestDto {
	private String userId;
	private String username;
	private String password;
	private String email;
	private boolean applyAsCreator; // 작가 승인 여부가 아니라 사용자가 작가가 되고 싶다고 신청한 여부를 나타내는 것임!!!

}
