package com.ome.dto.recipe.response;

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


    public static RecipeResponseDto from(Recipe recipe) {
        RecipeResponseDto dto = new RecipeResponseDto();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setWriterId(recipe.getWriter().getId());
        dto.setWriterNickname(recipe.getWriter().getUsername());
        dto.setTitle(recipe.getTitle());
        dto.setDescription(recipe.getDescription());
        dto.setIsPremium(recipe.getIsPremium().name());
        dto.setCategory(recipe.getCategory().name());

        
        return dto;
    }
}
