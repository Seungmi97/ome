package com.ome.dto.recipe.response;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ome.domain.Media;
import com.ome.domain.Recipe;

import lombok.Data;

@Data
public class RecipeDetailDto {
    private Long writerId;  
    private String writerNickname;
    private Long recipeId;
    private String title;
    private String description;
    private String content;
    private String isPremium;
    private String category;
    private String ingredients;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime updatedAt;
    private List<String> imageUrls; // 이미지 경로 리스트
    


    public static RecipeDetailDto from(Recipe recipe,  List<Media> images) {
        RecipeDetailDto dto = new RecipeDetailDto();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setWriterId(recipe.getWriter().getId());
        dto.setWriterNickname(recipe.getWriter().getUsername());
        dto.setTitle(recipe.getTitle());
        dto.setDescription(recipe.getDescription());
        dto.setContent(recipe.getContent());
        dto.setIsPremium(recipe.getIsPremium().name());
        dto.setCategory(recipe.getCategory().name());
        dto.setIngredients(recipe.getIngredients());
        dto.setCreatedAt(recipe.getCreatedAt());
        dto.setUpdatedAt(recipe.getUpdatedAt());
        dto.setImageUrls(images.stream().map(Media::getUrl).toList()); // 이미지 URL만 추출

        
        return dto;
    }
}
