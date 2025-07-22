package com.ome.repository.qna;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ome.domain.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

}
