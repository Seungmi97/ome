package com.ome.service.recipe;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ome.common.enums.Category;
import com.ome.common.enums.MemberState;
import com.ome.common.enums.PremiumType;
import com.ome.common.enums.Role;
import com.ome.common.enums.TargetType;
import com.ome.domain.Media;
import com.ome.domain.Membership;
import com.ome.domain.Recipe;
import com.ome.domain.Users;
import com.ome.dto.recipe.request.RecipeRequestDto;
import com.ome.dto.recipe.response.RecipeDetailDto;
import com.ome.dto.recipe.response.RecipeResponseDto;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.membership.MembershipRepository;
import com.ome.repository.recipe.MediaRepository;
import com.ome.repository.recipe.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final MediaRepository mediaRepository;
    private final MembershipRepository membershipRepository;
   

    @Value("${file.upload-dir}")
    private String uploadDir; // 파일 저장 경로

    /**
     * 레시피 등록
     * @param id
     * @param dto
     * @param files
     * @return
     */ 
    @Transactional //내부적으로 DB 세션 유지하며 실행되게 보장
    public Long createRecipeWithMedia(Long id, RecipeRequestDto dto, List<MultipartFile> files) {
    	
        // 1. 유저 조회
        Users creator = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));
        
       // 작가 또는 관리자 권한만 허용
        if (creator.getRole() != Role.CREATOR && creator.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("레시피는 작가만 등록할 수 있습니다.");
        }

        // 승인 여부 체크
        if (!creator.isApproved()) {
            throw new AccessDeniedException("작가 승인이 완료되지 않았습니다.");
        }

        // 2. 레시피 생성 및 저장
        Recipe recipe = new Recipe();
        //recipe.setWriter(creator);
        creator.addRecipe(recipe);
        recipe.setTitle(dto.getTitle());
        recipe.setDescription(dto.getDescription());
        recipe.setContent(dto.getContent());
        recipe.setIsPremium(dto.getIsPremium());
        recipe.setCategory(dto.getCategory());
        recipe.setIngredients(dto.getIngredients());
        recipe.setReported(false); // 기본값
        recipe.setCreatedAt(LocalDateTime.now());
        recipe.setUpdatedAt(LocalDateTime.now());

        Recipe saved = recipeRepository.save(recipe);

        // 3. 미디어 처리
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            if (!file.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename(); //로컬저장
                Path path = Paths.get(uploadDir, fileName);
                try {
                	 // 폴더 없으면 생성
                    if (!Files.exists(path.getParent())) {
                        Files.createDirectories(path.getParent());
                    }
                	
                    Files.write(path, file.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException("파일 저장 실패", e);
                }

                Media media = new Media();
                media.setTargetType(TargetType.RECIPE);
                media.setTargetId(saved.getRecipeId());
                media.setUrl("/uploads/" + fileName); // 정적 리소스 경로 기준
                media.setSeq(i); // 정렬 순서
                media.setUploadedAt(LocalDateTime.now());

                mediaRepository.save(media);
            }
        }

        return saved.getRecipeId(); // 생성된 레시피 ID 반환
    }
    
    
    /**
     * 레시피 전체 목록 조회(검색, 필터링, 페이징)
     * @param keyword
     * @param category
     * @param isPremium
     * @param pageable
     * @return
     */
    public Page<RecipeResponseDto> getAllRecipes(String keyword, Category category, PremiumType isPremium, Pageable pageable) {
        Page<Recipe> recipes = recipeRepository.getAllRecipes(keyword, category, isPremium, pageable);
        return recipes.map(RecipeResponseDto::from); // 각 레시피를 DTO로 변환
    }
    
    /**
     * 레시피 상세 조회
     * @param recipeId
     * @param userId
     * @return
     */
    @Transactional    
    public RecipeDetailDto getRecipeDetail(Long recipeId, Long id) {
    	Users user = userRepository.findById(id)
    	        .orElseThrow(() -> new RuntimeException("사용자 없음"));

    	   Optional<Membership> membershipOpt = membershipRepository.findByUser(user);

    	    Recipe recipe = recipeRepository.findById(recipeId)
    	        .orElseThrow(() -> new RuntimeException("레시피 없음"));

    	    // 프리미엄 제한
    	    if (recipe.getIsPremium() == PremiumType.premium) {
    	        boolean isPremiumUser = membershipOpt.isPresent()
    	                && membershipOpt.get().getMemberState() == MemberState.premium;

    	        if (!isPremiumUser) {
    	            throw new RuntimeException("유료 레시피는 프리미엄 멤버십만 조회할 수 있습니다.");
    	        }
    	    }

    	    // 이미지 불러오기
    	    List<Media> mediaList = mediaRepository.findByTargetTypeAndTargetIdOrderBySeqAsc(
    	            TargetType.RECIPE, recipe.getRecipeId()
    	    );

    	    return RecipeDetailDto.from(recipe, mediaList);
    }
    

    
    
}