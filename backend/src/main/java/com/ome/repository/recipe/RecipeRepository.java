package com.ome.repository.recipe;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ome.common.enums.Category;
import com.ome.common.enums.PremiumType;
import com.ome.domain.Recipe;
import com.ome.domain.Users;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
	
	/**
	 * 레시피 검색, 필터링, 페이징
	 * @param keyword
	 * @param category
	 * @param isPremium
	 * @param pageable
	 * @return
	 */
	@EntityGraph(attributePaths = "writer") //fetch 조인을 어노테이션으로 사용할 수 있게함
    @Query("""
            SELECT r FROM Recipe r
            WHERE 
                (:keyword IS NULL OR LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                              OR LOWER(r.content) LIKE LOWER(CONCAT('%', :keyword, '%')))
            AND (:category IS NULL OR r.category = :category)   
            AND (:isPremium IS NULL OR r.isPremium = :isPremium)
        """) // null 체크를 조건 안에 넣어서, 값이 없으면 해당 조건은 무시됨
        Page<Recipe> getAllRecipes(
            @Param("keyword") String keyword,
            @Param("category") Category category,
            @Param("isPremium") PremiumType isPremium,
            Pageable pageable
        );
	
	@EntityGraph(attributePaths = "bookmarks") //bookmarks까지 fetch
	Optional<Recipe> findWithBookmarksByRecipeId(Long recipeId);
}
