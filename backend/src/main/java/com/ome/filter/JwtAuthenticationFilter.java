package com.ome.filter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ome.domain.Users;
import com.ome.repository.auth.UserRepository;
import com.ome.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;	

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final JwtUtil jwtUtil;
	private final UserRepository userRepository;
	
	
	// 요청 헤더에서 토큰 꺼내기
	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {https://chatgpt.com/c/68715768-384c-8013-bcd8-60860e6d409e
			return bearerToken.substring(7); // "Bearer " 이후 토큰만 반환하도록 설계
		}
		return null;
	}

	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response , FilterChain filterChain) throws ServletException, IOException{
		try {
			String token = resolveToken(request);
			
			if(token != null && jwtUtil.validateToken(token)) {
				String userId = jwtUtil.getUserId(token);
				
				Optional<Users> optionalUser = userRepository.findByUserId(userId);
				
				if(optionalUser.isPresent()) {
					Users user = optionalUser.get();
					
					//인증 객체 생성 
					UsernamePasswordAuthenticationToken  authentication = 
							new UsernamePasswordAuthenticationToken( user , null , List.of(new SimpleGrantedAuthority(user.getRole().name())));authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

		                    // SecurityContext에 인증 정보 저장
		                    SecurityContextHolder.getContext().setAuthentication(authentication);
		                }
		            }
		        } catch (Exception ex) {
		            // JWT 예외 발생 시 로그 남기고 인증 안된 상태 유지
		            logger.error("Could not set user authentication in security context", ex);
		        }

		        // 필터 체인 계속 진행
		        filterChain.doFilter(request, response);
		    }
	

}
