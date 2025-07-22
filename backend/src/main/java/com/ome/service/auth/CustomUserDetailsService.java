package com.ome.service.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ome.domain.Users;
import com.ome.repository.auth.UserRepository;

import lombok.RequiredArgsConstructor;

// 로그인 시 Spring Security가 UserId 기반으로 사용자 정보 찾을 때 사용하는 서비스 
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{ 
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername (String userId ) throws UsernameNotFoundException {
		 Users user = userRepository.findByUserId(userId)
	                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 사용자입니다: " + userId));
	        return new CustomUserDetails(user);
	    }

}
