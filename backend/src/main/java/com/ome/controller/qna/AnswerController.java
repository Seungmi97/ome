package com.ome.controller.qna;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ome.dto.qna.request.AnswerRequestDto;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.qna.AnswerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
public class AnswerController {
	
	private final AnswerService answerService;

	@PostMapping("/questions/{questionId}/answers")
	public ResponseEntity<String> createAnswer(@PathVariable Long questionId,
											   @RequestBody AnswerRequestDto requestDto,
											   @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(answerService.createAnswer(questionId, requestDto, user.getId()));
	}
}
