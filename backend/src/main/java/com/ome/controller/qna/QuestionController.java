package com.ome.controller.qna;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.dto.qna.request.QuestionRequestDto;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.qna.QuestionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qna/questions")
@RequiredArgsConstructor
public class QuestionController {

	private final QuestionService questionService;
	
	@PostMapping
	public ResponseEntity<String> createQuestion(@RequestBody QuestionRequestDto requestDto,
												 @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(questionService.createQuestion(requestDto, user.getUser()));
	}
}
