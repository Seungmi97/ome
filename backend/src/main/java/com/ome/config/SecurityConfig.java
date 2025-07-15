package com.ome.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ome.exception.handler.JwtAccessDeniedHandler;
import com.ome.exception.handler.JwtAuthenticationEntryPoint;
import com.ome.filter.JwtAuthenticationFilter;
import com.ome.service.auth.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthenticationFilter filter;
	private final CustomUserDetailsService customUserDetailService;

   
	// 보안 관련 설정하기 
	  @Bean
	    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	        http
	            .csrf(AbstractHttpConfigurer::disable)
	            .cors(Customizer.withDefaults())
	            .sessionManagement(session -> 
	                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	            .authorizeHttpRequests(auth -> auth
	                .requestMatchers("/api/auth/signup","/api/auth/login","/api/auth/check-id","/api/auth/check-email").permitAll()
	                .requestMatchers("/api/**").authenticated()
	                .requestMatchers("/admin/**").hasRole("ADMIN") // 관리자 권한을 가진 사용자에게만 접근 가능
	                .requestMatchers("/creator/**").hasRole("CREATOR") // 작가 권한을 가진 사용자에게만 접근 가능
	                .anyRequest().authenticated() // USER은 여기서 처리 
	            )
	            .exceptionHandling(e -> e
	                .authenticationEntryPoint(new JwtAuthenticationEntryPoint()) // 401 처리
	                .accessDeniedHandler(new JwtAccessDeniedHandler()) // 403 처리
	            )
	            .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class); // JwtAuthenticaitonFilter 등록 -> 작동 가능

	        return http.build();
	    }
	  
	  // 로그인 요청 시 인증 수행
	  @Bean
	  public AuthenticationManager authenticationManger(AuthenticationConfiguration config) throws Exception {
		  return config.getAuthenticationManager();
		  
	  }
	  
	  // 비밀번호 해싱하기 -> BCrypt사용
	  @Bean
	  public PasswordEncoder passwordEncoder() {
		  return new BCryptPasswordEncoder();
	  }

}
