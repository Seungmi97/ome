package com.ome.service.qna;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.ome.domain.Answer;
import com.ome.domain.Question;
import com.ome.domain.Users;
import com.ome.dto.qna.request.AnswerRequestDto;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.qna.AnswerRepository;
import com.ome.repository.qna.QuestionRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnswerService {
	
	private final QuestionRepository questionRepository;
	private final UserRepository userRepository;
	private final AnswerRepository answerRepository;
	
	@Transactional
	public String createAnswer(Long questionId, AnswerRequestDto requestDto, Long userId) {
		
		Question question = questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException("존재하지 않는 질문글입니다"));
		
		if(question.getRecipe().getWriter().getId() != userId) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		Users creator = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다"));
		
		Answer answer = new Answer();
		answer.setCreator(creator);
		answer.setContent(requestDto.getContent());
		
		question.setAnswer(answer);
		questionRepository.save(question);
		
		return "답변이 등록되었습니다";
	}

	@Transactional
	public String updateAnswer(Long id, AnswerRequestDto requestDto, Long userId) {
		
		Answer answer = answerRepository.findById(id).orElseThrow(() -> new RuntimeException("존재하지 않는 답변입니다"));
		
		if(answer.getCreator().getId() != userId) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		answer.setContent(requestDto.getContent());
		
		return "답변이 수정되었습니다";
	}
 
}
