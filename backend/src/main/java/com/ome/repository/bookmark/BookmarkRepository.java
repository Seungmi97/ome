package com.ome.repository.bookmark;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ome.domain.Bookmark;
import com.ome.domain.Recipe;
import com.ome.domain.Users;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
	
	//북마크 여부 확인
    boolean existsByUserAndRecipe(Users user, Recipe recipe);
    
    Optional<Bookmark> findByUserAndRecipe(Users user, Recipe recipe);
    
    
    //특정 사용자가 북마크한 모든 Bookmark 객체를 조회하면서, 연관된 recipe객체와 writer들도 함께 가져옴 (fetch join)
    @Query("""
    	    SELECT b 
    	    FROM Bookmark b
    	    JOIN FETCH b.recipe r
    	    JOIN FETCH r.writer
    	    WHERE b.user.id = :userId
    	""")
    List<Bookmark> findAllByUserIdWithRecipeAndWriter(@Param("userId") Long userId);
    
   // 총 북마크 개수 - 작가 마이페이지
   int countByRecipe_Writer_UserId(String userId);
}