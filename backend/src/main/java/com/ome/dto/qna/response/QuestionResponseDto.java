package com.ome.dto.qna.response;

import java.time.LocalDateTime;

import com.ome.domain.Answer;
import com.ome.domain.Question;

import lombok.Data;

@Data
public class QuestionResponseDto {
	
	private Long id;
	private String title;
	private String content;
	private boolean isSecret;
	private LocalDateTime createdAt;
	private String author;
	private String status;
	private Answer answer;
	
	public static QuestionResponseDto from(Question question) {
		QuestionResponseDto dto = new QuestionResponseDto();
		dto.setId(question.getQuestionId());
		dto.setTitle(question.getTitle());
		dto.setContent(question.getContent());
		dto.setSecret(question.isSecret());
		dto.setCreatedAt(question.getCreatedAt());
		dto.setAuthor(question.getUser().getUsername());
		dto.setStatus(question.getStatus().toString());
		dto.setAnswer(question.getAnswer());
		
		return dto;
	}
}
