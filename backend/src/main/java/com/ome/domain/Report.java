package com.ome.domain;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.ome.common.enums.ReportStatus;
import com.ome.common.enums.ReportTargetType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "report")
@Data
@NoArgsConstructor
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "report_id")
	private Long reportId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private Users user;
	
	@Column(name = "target_id", nullable = false)
	private Long targetId;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "target_type", nullable = false)
	private ReportTargetType targetType;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String reason;
	
	@Enumerated(EnumType.STRING)
	private ReportStatus status;
	
	@CreationTimestamp
	private LocalDateTime createdAt;
}
