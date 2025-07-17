package com.ome.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.ome.common.enums.QuestionStatus;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "question")
@Data
@NoArgsConstructor
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "question_id")
	private Long questionId;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
	private Users user;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
	private Recipe recipe;
	
	@Column(nullable = false, length = 50)
	private String title;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;
	
	@Column(name = "is_secret", nullable = false)
	private boolean isSecret;
	
	@Enumerated(EnumType.STRING)
	private QuestionStatus status;
	
	@CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;
}
