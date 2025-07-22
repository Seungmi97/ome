package com.ome.controller.comment;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.common.enums.Role;
import com.ome.domain.Users;
import com.ome.dto.comment.request.CommentRequestDto;
import com.ome.dto.comment.response.CommentResponseDto;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.comment.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recipes/comments")
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;

    /**
     * 댓글 작성
     * @param dto
     * @param userDetails
     * @return
     */
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CommentRequestDto dto,
                                       @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long commentId = commentService.createComment(dto, userDetails.getId());
        CommentResponseDto response = commentService.getCommentDtoById(commentId);
        return ResponseEntity.ok(response);
    }
    
    /**
     * 댓글 트리 구조 조회 (정렬된 대댓글 포함)
     * @param recipeId
     * @return
     */
    @GetMapping("/{recipeId}")
    public ResponseEntity<List<CommentResponseDto>> getCommentTree(@PathVariable Long recipeId, 
    		                                                       @AuthenticationPrincipal CustomUserDetails userDetails) {
    	Users user = userDetails.getUser();
    	List<CommentResponseDto> response = commentService.getCommentTree(recipeId, user);
    	return ResponseEntity.ok(response);
    }

    /**
     * 댓글 수정
     * @param id
     * @param newContent
     * @param userDetails
     * @return
     */
    @PutMapping("/{commentId}")
    public ResponseEntity<?> update(@PathVariable Long commentId,
                                       @RequestBody String newContent,
                                       @AuthenticationPrincipal CustomUserDetails userDetails) {
    	commentService.updateComment(commentId, newContent, userDetails.getId());
        return ResponseEntity.ok("댓글 수정 완료");
    }

    /**
     * 댓글 삭제
     * @param id
     * @param userDetails
     * @return
     */
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> delete(@PathVariable Long commentId,
                                       @AuthenticationPrincipal CustomUserDetails userDetails) {
        commentService.deleteComment(commentId, userDetails.getId(), userDetails.getRole() == Role.ADMIN);
        return ResponseEntity.ok("댓글 삭제 완료");
    }


}
