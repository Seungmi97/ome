package com.ome.dto.review.response;

import java.time.LocalDateTime;
import java.util.List;

import com.ome.domain.Media;
import com.ome.domain.Review;

import lombok.Data;

@Data
public class ReviewResponseDto {

	private Long id;
	private String author;
	private String comment;
	private List<String> imageUrls;
	private LocalDateTime createdAt;
	
	public static ReviewResponseDto from(Review review, List<Media> images) {
		ReviewResponseDto dto = new ReviewResponseDto();
		dto.setId(review.getReviewId());
		dto.setAuthor(review.getUser().getUsername());
		dto.setComment(review.getComment());
		dto.setImageUrls(images.stream().map(Media::getUrl).toList());
		dto.setCreatedAt(review.getCreatedAt());
		
		return dto;
	}
}
