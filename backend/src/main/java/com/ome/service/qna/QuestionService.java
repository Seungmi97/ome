package com.ome.service.qna;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.ome.common.enums.MemberState;
import com.ome.common.enums.PremiumType;
import com.ome.common.enums.QuestionStatus;
import com.ome.common.enums.Role;
import com.ome.domain.Question;
import com.ome.domain.Recipe;
import com.ome.domain.Users;
import com.ome.dto.qna.request.QuestionRequestDto;
import com.ome.dto.qna.response.QuestionResponseDto;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.qna.QuestionRepository;
import com.ome.repository.recipe.RecipeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {
	
	private final QuestionRepository questionRepository;
	private final RecipeRepository recipeRepository;
	private final UserRepository userRepository;

	@Transactional
	public String createQuestion(QuestionRequestDto requestDto, Users user) {
		
		Recipe recipe = recipeRepository.findById(requestDto.getRecipeId()).orElseThrow(() -> new RuntimeException("존재하지 않는 레시피입니다"));
		
		if(recipe.getIsPremium() == PremiumType.premium && user.getMembership().getMemberState() != MemberState.premium) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		Question question = new Question();
		question.setRecipe(recipe);
		question.setUser(user);
		question.setTitle(requestDto.getTitle());
		question.setContent(requestDto.getContent());
		question.setSecret(requestDto.isSecret());
		question.setStatus(QuestionStatus.WAITING);
		questionRepository.save(question);
		
		return "질문이 등록되었습니다";
	}

	@Transactional
	public QuestionResponseDto getQuestion(Long id, Long userId) {
		
		Question question = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("존재하지 않는 질문글입니다"));
		Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("존재하지 않는 회원입니다"));
		
		if(question.isSecret() && 
				!(userId == question.getUser().getId() || userId == question.getRecipe().getWriter().getId() || user.getRole() == Role.ADMIN)) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		return QuestionResponseDto.from(question);
	}

	@Transactional
	public Page<QuestionResponseDto> getAllQuestion(Long recipeId, int page, int size) {
		
		Pageable pageable = PageRequest.of(page, size);
		Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RuntimeException("존재하지 않는 레시피입니다"));
		return questionRepository.findAllByRecipe(recipe, pageable).map(QuestionResponseDto::from);
	}

	@Transactional
	public String updateQuestion(Long id, QuestionRequestDto requestDto, Long userId) {
		
		Question question = questionRepository.findById(id).orElseThrow(() -> new RuntimeException("존재하지 않는 질문글입니다"));
		
		if(question.getUser().getId() != userId) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		question.setTitle(requestDto.getTitle());
		question.setContent(requestDto.getContent());
		question.setSecret(requestDto.isSecret());
		
		return "질문이 수정되었습니다";
	}

}
