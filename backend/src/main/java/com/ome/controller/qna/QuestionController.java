package com.ome.controller.qna;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.service.auth.CustomUserDetails;
import com.ome.service.qna.QuestionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qna/questions")
@RequiredArgsConstructor
public class QuestionController {

	private final QuestionService questionService;
	
	@PostMapping
	public ResponseEntity<String> createQuestion(@RequestBody Long recipe_id,
												 @RequestBody String title,
												 @RequestBody String content,
												 @RequestBody boolean is_secret,
												 @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.status(HttpStatus.OK).body(questionService.createQuestion(recipe_id, user.getUser(), title, content, is_secret));
	}
}
