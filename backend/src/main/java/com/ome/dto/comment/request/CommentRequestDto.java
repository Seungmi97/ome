package com.ome.dto.comment.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDto {

    private Long recipeId;
    
    @NotBlank(message = "댓글 내용을 입력하세요.")
    private String content;
    
    private Long parentId; // 대댓글인 경우만 사용 (null이면 일반 댓글, 값 있으면 대댓글)
}