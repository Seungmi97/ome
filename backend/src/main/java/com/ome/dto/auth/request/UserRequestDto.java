package com.ome.dto.auth.request;



import com.ome.domain.Users.Role;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
//회원가입 요청 Dto
public class UserRequestDto {
	private String userId;
	private String username;
	private String email;
	private String password;
	private Role role;
	private boolean approved;

}
