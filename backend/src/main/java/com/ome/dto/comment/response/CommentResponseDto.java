package com.ome.dto.comment.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ome.domain.Comment;

public record CommentResponseDto(
	    Long commentId,
	    String content,
	    String writer, // null이면 "탈퇴한 사용자입니다"
	    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime createdAt,
	    Long parentId
	) {
	
	public static CommentResponseDto from(Comment comment) {
        return new CommentResponseDto(
            comment.getCommentId(),
            comment.getContent(),
            comment.getUser() != null ? comment.getUser().getUsername() : "익명",
            comment.getCreatedAt(),
            comment.getParentId() != null ? comment.getParentId().getCommentId() : null
        );
    }
	
}