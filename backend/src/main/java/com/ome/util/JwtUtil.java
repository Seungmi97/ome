package com.ome.util;

import io.jsonwebtoken.security.SecurityException;
import jakarta.servlet.http.HttpServletRequest;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	private final Key key;
	private final long expirationTime;
	
	// 생성자 -> 시크릿 키 초기화하기 
	public JwtUtil(@Value("${jwt.secret}") String secretKey , @Value("${jwt.expiration}") long expirationTime) {
		this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
		this.expirationTime = expirationTime;
	}
	
	
	// JWT 엑세스 토큰 생성하기 
	public String createToken(String userId , String role) {
		Claims claims = Jwts.claims().setSubject(userId);
		claims.put("role", role);
		
		Date now = new Date();
		Date expiry = new Date(now.getTime() + expirationTime);
		return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
	}
	
	// 토큰에서 userId 추출하기
	public String getUserId(String token) {
		return parseClaims(token).getSubject();
	}
	
	// 토큰에서 사용자 권한(role) 추출하기 
	public String getRole(String token) {
		return (String) parseClaims(token).get("role");
	}
	
	
	// 클레임 추출 내부 메소드 
	private Claims parseClaims(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	
	//유효한 토큰인지 검증하기
	public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException |
                 ExpiredJwtException | UnsupportedJwtException |
                 IllegalArgumentException e) {
        	 System.out.println("❌ JWT 검증 실패: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            return false;
        }
    }
	
	// 토큰값만 가져오기
	public String resolveToken(HttpServletRequest request) {
	    String bearerToken = request.getHeader("Authorization");
	    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
	        return bearerToken.substring(7); 
	    }
	    return null;
	}

}
