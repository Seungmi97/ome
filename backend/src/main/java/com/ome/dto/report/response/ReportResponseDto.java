package com.ome.dto.report.response;

import java.time.LocalDateTime;

import com.ome.domain.Report;

import lombok.Data;

@Data
public class ReportResponseDto {

	private Long id;
	private String reporter;
	private String targetType;
	private String target;
	private String reason;
	private String status;
	private LocalDateTime createdAt;
	
	public static ReportResponseDto from(Report report, String target) {
		ReportResponseDto dto = new ReportResponseDto();
		dto.setId(report.getReportId());
		dto.setReporter(report.getUser().getUsername());
		dto.setTargetType(report.getTargetType().toString());
		dto.setTarget(target);
		dto.setReason(report.getReason());
		dto.setStatus(report.getStatus().toString());
		dto.setCreatedAt(report.getCreatedAt());
		
		return dto;
	}
}
