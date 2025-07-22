package com.ome.dto.report.request;

import lombok.Getter;

@Getter
public class ReportRequestDto {
	private Long targetId;
	private String targetType;
	private String reason;
}
