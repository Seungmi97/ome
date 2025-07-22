package com.ome.repository.qna;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ome.domain.Answer;
import com.ome.domain.Question;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

	public Optional<Answer> findByQuestion(Question question);

}
