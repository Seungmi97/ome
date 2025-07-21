package com.ome.dto.admin.request;

import com.ome.common.enums.CreatorStatus;
import com.ome.common.enums.Role;
import com.ome.domain.Users;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserDto {
	
	private String userId;
	private String username;
	private String email;
	private Role role;
	private boolean approved;
	private CreatorStatus creatorStatus;
	
	public static UserDto from ( Users user) {
		return new UserDto (
				user.getUserId(),
				user.getUsername(),
				user.getEmail(),
				user.getRole(),
				user.isApproved(),
				user.getCreatorStatus()
	);
	}

}
