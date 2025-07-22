package com.ome.service.report;

import org.springframework.stereotype.Service;

import com.ome.common.enums.ReportStatus;
import com.ome.common.enums.ReportTargetType;
import com.ome.domain.Report;
import com.ome.domain.Users;
import com.ome.dto.report.request.ReportRequestDto;
import com.ome.repository.report.ReportRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

	private final ReportRepository reportRepository;
	
	@Transactional
	public String createReport(ReportRequestDto requestDto, Users user) {
		
		Report report = new Report();
		
		report.setUser(user);
		report.setTargetId(requestDto.getTargetId());
		
		switch(requestDto.getTargetType()) {
		case "recipe":
			report.setTargetType(ReportTargetType.RECIPE);
		case "comment":
			report.setTargetType(ReportTargetType.COMMENT);
		case "user":
			report.setTargetType(ReportTargetType.USER);
		}
		
		report.setReason(requestDto.getReason());
		report.setStatus(ReportStatus.PENDING);
		
		reportRepository.save(report);
		
		return "신고가 접수되었습니다";
	}
}
