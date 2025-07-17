package com.ome.dto.recipe.response;

import java.util.List;

import com.ome.domain.Media;
import com.ome.domain.Recipe;

import lombok.Data;

@Data
public class RecipeBookmarkDto {
	
	private Long recipeId;
	private Long writerId; 
    private String writerNickname;
    private String title;
    private String isPremium;
    private String thumbnailUrl;

    public static RecipeBookmarkDto fromEntity(Recipe recipe, List<Media> mediaList) {
    	RecipeBookmarkDto dto = new RecipeBookmarkDto();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setWriterId(recipe.getWriter().getId());
        dto.setWriterNickname(recipe.getWriter().getUsername());
        dto.setTitle(recipe.getTitle());
        dto.setIsPremium(recipe.getIsPremium().name());
        dto.setThumbnailUrl(mediaList.isEmpty() ? null : mediaList.get(0).getUrl());
        return dto;
    }
}
