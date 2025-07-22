package com.ome.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "answer")
@Data
@NoArgsConstructor
public class Answer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "answer_id")
	private Long answerId;
	
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = true, unique = true)
    private Question question;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
	private Users creator;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;
	
	@CreationTimestamp
	private LocalDateTime createdAt;
}
