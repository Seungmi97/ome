package com.ome.dto.qna.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class QuestionRequestDto {

	@JsonProperty("recipe_id")
	private Long recipeId;
	
	private String title;
	
	private String content;
	
	@JsonProperty("is_secret")
	private boolean isSecret;
}
