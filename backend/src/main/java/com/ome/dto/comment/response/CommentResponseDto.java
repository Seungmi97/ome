package com.ome.dto.comment.response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public record CommentResponseDto(
	    Long commentId,
	    String content,
	    String writer, // null이면 "탈퇴한 사용자입니다"
	    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime createdAt,
	    Long parentId
	) {}