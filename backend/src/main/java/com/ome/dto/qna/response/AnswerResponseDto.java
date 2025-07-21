package com.ome.dto.qna.response;

import java.time.LocalDateTime;

import com.ome.domain.Answer;
import com.ome.domain.Question;

import lombok.Data;

@Data
public class AnswerResponseDto {
	
	private Long id;
	private String content;
	private LocalDateTime createdAt;
	private String author;
	
	public static AnswerResponseDto from(Answer answer) {
		AnswerResponseDto dto = new AnswerResponseDto();
		dto.setId(answer.getAnswerId());
		dto.setContent(answer.getContent());
		dto.setCreatedAt(answer.getCreatedAt());
		dto.setAuthor(answer.getCreator().getUsername());
		
		return dto;
	}
}
