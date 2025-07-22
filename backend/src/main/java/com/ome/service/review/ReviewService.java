package com.ome.service.review;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ome.common.enums.MemberState;
import com.ome.common.enums.PremiumType;
import com.ome.common.enums.TargetType;
import com.ome.domain.Media;
import com.ome.domain.Recipe;
import com.ome.domain.Review;
import com.ome.domain.Users;
import com.ome.dto.review.request.ReviewRequestDto;
import com.ome.repository.recipe.MediaRepository;
import com.ome.repository.recipe.RecipeRepository;
import com.ome.repository.review.ReviewRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

	private final RecipeRepository recipeRepository;
	private final ReviewRepository reviewRepository;
	private final MediaRepository mediaRepository;
	
	@Value("${file.upload-dir}")
	private String uploadDir; // 파일 저장 경로
	
	@Transactional
	public String createReview(Long recipeId, ReviewRequestDto requestDto, Users user, List<MultipartFile> files) {
		
		Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RuntimeException("존재하지 않는 레시피입니다"));
		
		if(recipe.getIsPremium() == PremiumType.premium && user.getMembership().getMemberState() != MemberState.premium) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		Review review = new Review();
		review.setUser(user);
		review.setCreator(recipe.getWriter());
		review.setRecipe(recipe);
		review.setComment(requestDto.getComment());
		
		review = reviewRepository.save(review);
		
		// Media
		for(int i = 0; i < files.size(); i++) {
			MultipartFile file = files.get(i);
			if(!file.isEmpty()) {
				String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
				Path path = Paths.get(uploadDir, fileName);
				try {
					if(!Files.exists(path.getParent())) {
						Files.createDirectories(path.getParent());
					}
					Files.write(path, file.getBytes());
				} catch(IOException e) {
					throw new RuntimeException("파일 저장 실패", e);
				}
				
				Media media = new Media();
				media.setTargetType(TargetType.REVIEW);
				media.setTargetId(review.getReviewId());
				media.setUrl("/uploads/" + fileName);
				media.setSeq(i);
				media.setUploadedAt(LocalDateTime.now());
				
				mediaRepository.save(media);
			}
		}
		
		return "후기가 등록되었습니다";
	}
}
