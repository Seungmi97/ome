package com.ome.dto.recipe.response;

import java.util.List;

import com.ome.domain.Media;
import com.ome.domain.Recipe;
import com.ome.domain.Users;

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
        dto.setImageUrls(images.stream().map(Media::getUrl).toList()); // 이미지 URL만 추출

        
        return dto;
    }
}
