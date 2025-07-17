package com.ome.service.qna;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.ome.common.enums.MemberState;
import com.ome.common.enums.PremiumType;
import com.ome.domain.Question;
import com.ome.domain.Recipe;
import com.ome.domain.Users;
import com.ome.repository.qna.QuestionRepository;
import com.ome.repository.recipe.RecipeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {
	
	private final QuestionRepository questionRepository;
	private final RecipeRepository recipeRepository;

	public String createQuestion(Long recipe_id, Users user, String title, String content, boolean is_secret) {
		
		Recipe recipe = recipeRepository.findById(recipe_id).orElseThrow(() -> new RuntimeException("존재하지 않는 레시피입니다"));
		
		if(recipe.getIsPremium() == PremiumType.premium && user.getMembership().getMemberState() != MemberState.premium) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		Question question = new Question();
		question.setRecipe(recipe);
		question.setUser(user);
		question.setTitle(title);
		question.setContent(content);
		questionRepository.save(question);
		
		return "질문이 등록되었습니다";
	}

}
