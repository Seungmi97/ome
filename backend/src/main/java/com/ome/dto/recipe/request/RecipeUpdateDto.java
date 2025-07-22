package com.ome.dto.recipe.request;

import java.util.List;

import com.ome.common.enums.PremiumType;
import com.ome.common.enums.RecipeCategory;

import lombok.Data;

@Data
public class RecipeUpdateDto {
	private String title;
    private String description;
    private String content;
    private PremiumType isPremium;
    private RecipeCategory category;
    private String ingredients;


    // 삭제할 이미지 ID 목록
    private List<Long> deleteImageIds;
}
