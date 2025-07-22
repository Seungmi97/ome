package com.ome.dto.recipe.request;

import com.ome.common.enums.PremiumType;
import com.ome.common.enums.RecipeCategory;

import lombok.Data;

@Data
public class RecipeRequestDto {
    private String title;
    private String description;
    private String content;
    private PremiumType isPremium; // free or premium
    private RecipeCategory category;
    private String ingredients;
}
