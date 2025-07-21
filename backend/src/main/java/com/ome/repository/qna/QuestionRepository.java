package com.ome.repository.qna;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ome.domain.Question;
import com.ome.domain.Recipe;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

	Page<Question> findAllByRecipe(Recipe recipe, Pageable pageable);

}
