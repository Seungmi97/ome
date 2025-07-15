package com.ome.service.auth;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ome.domain.Users;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {
	
	private final Users user;
	
	// 권한을 문자열로 변환하기 -> 권한 부여 및 인가 처리를 위해
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singleton(()-> "ROLE_" + user.getRole().name());
	}
	
	
	// 비밀번호 리턴 -> 로그인 검증 시 비교용
	 @Override
	 public String getPassword() {
		 return user.getPassword();
	 }
	 
	 // 로그인 id 리턴 -> 로그인 id 토큰 subject로 넣기 위함
	 @Override
	 public String getUsername() {
		 return user.getUserId();
	 }
	 
	 
	 // 계정 만료 여부 
	 @Override
	 public boolean isAccountNonExpired(){
		 return true;
	 }
	 
	 
	 // 계정 잠김 여부
	 @Override
	 public boolean isAccountNonLocked() {
		 return true; 
	 }
	 
	 // 계정 활성화 여부 
	 @Override 
	 public boolean isEnabled() {
		 return true;
	 }
	 
	 public Users getUser() {
		 return user;
	 }
	

}
