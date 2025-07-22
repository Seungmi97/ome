package com.ome.filter;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ome.domain.Users;
import com.ome.repository.auth.UserRepository;
import com.ome.service.auth.CustomUserDetails;
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
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7); // "Bearer " 이후 토큰만 반환하도록 설계
		}
		return null;
	}

	// 쿠키에서 jwt 토큰을 꺼내기
	private String extractTokenFromCookies(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (var cookie : request.getCookies()) {
				if ("jwt".equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String token = resolveToken(request);
			System.out.println("🟡 [토큰 추출됨] = " + token);

			if (token != null && jwtUtil.validateToken(token)) {
			    System.out.println("✅ [토큰 유효함]");

			    String userId = jwtUtil.getUserId(token);
			    System.out.println("🔑 [userId 추출됨] = " + userId);

			    Optional<Users> optionalUser = userRepository.findByUserId(userId);
			    if (optionalUser.isPresent()) {
			        System.out.println("✅ [유저 조회 성공]");

			        Users user = optionalUser.get();
			        CustomUserDetails customUserDetails = new CustomUserDetails(user);

			        UsernamePasswordAuthenticationToken auth =
			            new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());

			        SecurityContextHolder.getContext().setAuthentication(auth);
			        System.out.println("🛡️ [인증 객체 SecurityContext에 주입 완료]");
			    } else {
			        System.out.println("❌ [userRepository에서 유저 못 찾음]");
			    }
			} else {
			    System.out.println("❌ [토큰 유효성 실패]");
			}
		} catch (Exception ex) {
			// JWT 예외 발생 시 로그 남기고 인증 안된 상태 유지
			logger.error("Could not set user authentication in security context", ex);
		}

		// 필터 체인 계속 진행
		filterChain.doFilter(request, response);
	}

}
