package com.ome.dto.auth.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
// 사용자 로그인 시 토큰 발급하기 위한 response!!
@Getter
@AllArgsConstructor
public class LoginResponseDto {
	
	private String message;
	private String token;

}
