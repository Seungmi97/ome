package com.ome.repository.qna;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ome.domain.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
