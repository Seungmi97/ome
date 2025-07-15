package com.ome.controller.recipe;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Sort;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ome.common.enums.Category;
import com.ome.common.enums.PremiumType;
import com.ome.common.enums.Role;
import com.ome.dto.recipe.request.RecipeRequestDto;
import com.ome.dto.recipe.response.RecipeDetailDto;
import com.ome.dto.recipe.response.RecipeResponseDto;
import com.ome.service.recipe.RecipeService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.ome.service.auth.CustomUserDetails;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    /**
     * 레시피 등록
     * @param json
     * @param files
     * @return
     * @throws JsonProcessingException
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // multipart/form-data 형식의 요청만 처리 (파일 + JSON 업로드용)
    public ResponseEntity<?> createRecipe( 
            @RequestPart("data") String json,  // JSON 형식의 레시피 데이터 파트 (문자열로 받음)
            @RequestPart(value = "files", required = false) List<MultipartFile> files, // 업로드한 이미지 파일들
            @AuthenticationPrincipal CustomUserDetails user
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        RecipeRequestDto dto = objectMapper.readValue(json, RecipeRequestDto.class); // 직접 파싱
    	
        // 권한 체크
        if (user.getRole() != Role.CREATOR && user.getRole() != Role.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("레시피 등록 권한 없음");
        }
        
        Long userId = user.getId();
        Long recipeId = recipeService.createRecipeWithMedia(userId, dto, files != null ? files : List.of());
        
        return ResponseEntity.ok(Map.of("recipeId", recipeId));
    }
    
    
    /**
     * 레시피 전체 목록 조회(검색, 필터링, 페이징)
     * 로그인 한 모든 사용자(유료/무료) 접근 가능 
     * @param keyword
     * @param category
     * @param isPremium
     * @param pageable
     * @return
     */
    @GetMapping
    public ResponseEntity<?> findAllRecipes(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) PremiumType isPremium,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) { // 페이징 정렬 순서 설정 enum
        Page<RecipeResponseDto> result = recipeService.getAllRecipes(keyword, category, isPremium, pageable);
        return ResponseEntity.ok(result);
    }
    
    /**
     * 레시피 상세 조회
     * 무료 레시피 = 모든 사용자 열람 가능
     * 유료 레시피 = 유료플랜 사용만 열람 가능
     * @param recipeId
     * @return
     */
    @GetMapping("/{recipeId}")
    public ResponseEntity<?> getRecipeDetail(@PathVariable Long recipeId, @AuthenticationPrincipal CustomUserDetails user) {
        Long userId = user.getId();
        RecipeDetailDto detail  = recipeService.getRecipeDetail(recipeId, userId);
        return ResponseEntity.ok(detail);
    }
    


    

}