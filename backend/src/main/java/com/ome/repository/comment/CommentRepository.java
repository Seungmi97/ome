package com.ome.repository.comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ome.domain.Comment;
import com.ome.domain.Recipe;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
	
    // 특정 레시피에 속한 댓글 전체 조회 (작성일순)
	@Query("SELECT c FROM Comment c LEFT JOIN FETCH c.user WHERE c.recipe = :recipe ORDER BY c.createdAt ASC")
    List<Comment> findByRecipeOrderByCreatedAtAsc(@Param("recipe") Recipe recipe);

    // 특정 유저가 작성한 댓글 전체 조회 (마이페이지용 등, 현재는 안 쓰지만 확장용)
    List<Comment> findByUserId(Long userId);

}
