package com.ome.controller.review;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ome.dto.review.request.ReviewRequestDto;
import com.ome.dto.review.response.ReviewResponseDto;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.review.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

	private final ReviewService reviewService;
	
	@PostMapping(path = "/recipes/{recipeId}/reviews", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // multipart/form-data 형식의 요청만 처리 (파일 + JSON 업로드용)
	public ResponseEntity<String> createReview(@PathVariable Long recipeId,
											   @RequestPart("data") String json,  // JSON 형식의 레시피 데이터 파트 (문자열로 받음)
											   @RequestPart(value = "files", required = false) List<MultipartFile> files, // 업로드한 이미지 파일들
											   @AuthenticationPrincipal CustomUserDetails user
											   ) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		ReviewRequestDto dto = objectMapper.readValue(json, ReviewRequestDto.class);
		return ResponseEntity.ok(reviewService.createReview(recipeId, dto, user.getUser(), files != null ? files : List.of()));
	}
	
	@GetMapping("/recipes/{recipeId}/reviews")
	public ResponseEntity<Page<ReviewResponseDto>> getReview(@PathVariable Long recipeId,
													   @RequestParam(defaultValue = "0") int page,
													   @RequestParam(defaultValue = "10") int size,
													   @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(reviewService.getReview(recipeId, page, size, user.getId()));
	}
	
	@PatchMapping("/reviews/{id}")
	public ResponseEntity<String> updateReview(@PathVariable Long id,
											   @RequestPart("data") String json,  // JSON 형식의 레시피 데이터 파트 (문자열로 받음)
											   @RequestPart(value = "files", required = false) List<MultipartFile> files, // 업로드한 이미지 파일들
											   @AuthenticationPrincipal CustomUserDetails user
											   ) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		ReviewRequestDto dto = objectMapper.readValue(json, ReviewRequestDto.class);
		return ResponseEntity.ok(reviewService.updateReview(id, dto, user.getId(), files != null ? files : List.of()));
	}
}
