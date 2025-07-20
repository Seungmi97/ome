package com.ome.dto.recipe.response;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ome.domain.Media;
import com.ome.domain.Recipe;

import lombok.Data;

@Data
public class RecipeResponseDto {
	
    private Long recipeId;
    private Long writerId;  
    private String writerNickname;
    private String title;
    private String description;
    private String isPremium;
    private String category;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime updatedAt;
    private String thumbnailUrl;


    public static RecipeResponseDto from(Recipe recipe, List<Media> mediaList) {
        RecipeResponseDto dto = new RecipeResponseDto();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setWriterId(recipe.getWriter().getId());
        dto.setWriterNickname(recipe.getWriter().getUsername());
        dto.setTitle(recipe.getTitle());
        dto.setDescription(recipe.getDescription());
        dto.setIsPremium(recipe.getIsPremium().name()); //enum필드
        dto.setCategory(recipe.getCategory().name()); //enum필드
        dto.setCreatedAt(recipe.getCreatedAt());
        dto.setUpdatedAt(recipe.getUpdatedAt());
        dto.setThumbnailUrl(mediaList.isEmpty() ? null : mediaList.get(0).getUrl());
        
        return dto;
    }
}
