package com.ome.dto.auth.response;

import com.ome.domain.Users.Role;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
//응답 dto
public class UserResponseDto {
	private Long id;
	private String userId;
	private String username;
	private String email;
	private Role role;
}
