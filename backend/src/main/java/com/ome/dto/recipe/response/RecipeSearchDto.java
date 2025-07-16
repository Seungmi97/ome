package com.ome.dto.recipe.response;

import java.util.Locale.Category;

import com.ome.common.enums.PremiumType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeSearchDto {
    private String keyword;               // 제목 or 내용 검색 키워드
    private Category category;           // 카테고리 필터
    private PremiumType isPremium;       // 유료/무료 필터
}
