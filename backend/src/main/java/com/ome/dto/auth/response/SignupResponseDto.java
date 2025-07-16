package com.ome.dto.auth.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
// 🌟🌟 AuthService에서 토큰값을 보여주게 하기 위해 만든 dto임
@Getter
@AllArgsConstructor
public class SignupResponseDto {
	private String message;
	// 토큰값 확인용으로 만듦 
	private String token;
}
