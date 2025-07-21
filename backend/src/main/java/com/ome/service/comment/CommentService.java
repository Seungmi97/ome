package com.ome.service.comment;


import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.ome.domain.Comment;
import com.ome.domain.Recipe;
import com.ome.domain.Users;
import com.ome.dto.comment.request.CommentRequestDto;
import com.ome.dto.comment.response.CommentResponseDto;
import com.ome.exception.NotFoundException;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.comment.CommentRepository;
//import com.ome.repository.membership.MembershipRepository;
//import com.ome.repository.recipe.MediaRepository;
import com.ome.repository.recipe.RecipeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	
	private final RecipeRepository recipeRepository;
	private final UserRepository userRepository;
	//private final MembershipRepository membershipRepository;
	private final CommentRepository commentRepository;
	
	
	
	/**
	 * 댓글 작성
	 * @param dto
	 * @param userId
	 * @return
	 */
	public Long createComment(CommentRequestDto dto, Long userId) {
	    Users user = userRepository.findById(userId)
	        .orElseThrow(() -> new NotFoundException("유저 없음"));

	    Recipe recipe = recipeRepository.findById(dto.getRecipeId())
	        .orElseThrow(() -> new NotFoundException("레시피 없음"));

	    // 권한 체크
	    if (!user.canCommentOn(recipe)) {
	        throw new AccessDeniedException("댓글 작성 권한 없음");
	    }

	    // 대댓글 처리
	    Comment parent = null;
	    if (dto.getParentId() != null) {
	        parent = commentRepository.findById(dto.getParentId())
	            .orElseThrow(() -> new NotFoundException("부모 댓글 없음"));
	    }

	    Comment comment = new Comment();
	    comment.setUser(user);
	    comment.setRecipe(recipe);
	    comment.setContent(dto.getContent());
	    comment.setParentId(parent);

	    return commentRepository.save(comment).getCommentId();
	}
	
	
	
	/**
	 * 댓글,대댓글 조회 (트리 형태 정렬)
	 * @param recipeId
	 * @return
	 */
	public List<CommentResponseDto> getCommentTree(Long recipeId, Users user) {
	    // 레시피 엔티티 조회
	    Recipe recipe = recipeRepository.findById(recipeId)
	        .orElseThrow(() -> new NotFoundException("레시피 없음"));
	    
	    // 권한 체크
	    if (!user.canCommentOn(recipe)) {
	        throw new AccessDeniedException("댓글 작성 권한 없음");
	    }	    
	    
	    
	    // 댓글 전체 조회 (작성일 순)
	    List<Comment> all = commentRepository.findByRecipeOrderByCreatedAtAsc(recipe);
	    
	    // user.getUsername() 미리 호출해서 초기화 (컨트롤러나 Dto로 넘길 때 세션 종료돼도 문제 안 생김)
	    for (Comment comment : all) {
	        if (comment.getUser() != null) {
	            Hibernate.initialize(comment.getUser()); // 강제 초기화
	        }
	    }
	    
	    // 트리 형태 응답으로 변환
	    return all.stream().map(comment -> new CommentResponseDto(
	        comment.getCommentId(),
	        comment.getContent(),
	        comment.getUser() != null ? comment.getUser().getUsername() : "탈퇴한 사용자입니다",
	        comment.getCreatedAt(),
	        comment.getParentId() != null ? comment.getParentId().getCommentId() : null
	    )).toList();
	}
	
	
	/**
	 * 댓글 수정
	 * @param commentId
	 * @param newContent
	 * @param userId
	 */
	@Transactional
	public void updateComment(Long commentId, String newContent, Long userId) {
	    Comment comment = commentRepository.findById(commentId)
	        .orElseThrow(() -> new NotFoundException("댓글이 존재하지 않습니다."));

	    // 본인만 수정 가능
	    if (!comment.getUser().getId().equals(userId)) {
	        throw new AccessDeniedException("댓글 수정 권한이 없습니다.");
	    }

	    comment.setContent(newContent); // 업데이트
	}
	
	
	/**
	 * 댓글 삭제
	 * @param commentId
	 * @param userId
	 * @param isAdmin
	 */
	@Transactional
	public void deleteComment(Long commentId, Long userId, boolean isAdmin) {
	    Comment comment = commentRepository.findById(commentId)
	        .orElseThrow(() -> new NotFoundException("댓글이 존재하지 않습니다."));

	    // 본인 또는 관리자만 삭제 가능
	    if (!isAdmin && !comment.getUser().getId().equals(userId)) {
	        throw new AccessDeniedException("댓글 삭제 권한이 없습니다.");
	    }

	    commentRepository.delete(comment);
	}
	
}
