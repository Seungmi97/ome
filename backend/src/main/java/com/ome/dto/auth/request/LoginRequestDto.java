package com.ome.dto.auth.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class LoginRequestDto {
	@JsonProperty("user_id")
	private String userId;
	
	private String password;
}