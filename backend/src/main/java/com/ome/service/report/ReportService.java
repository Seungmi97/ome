package com.ome.service.report;

import org.springframework.stereotype.Service;

import com.ome.common.enums.ReportStatus;
import com.ome.common.enums.ReportTargetType;
import com.ome.domain.Report;
import com.ome.domain.Users;
import com.ome.dto.report.request.ReportRequestDto;
import com.ome.dto.report.response.ReportResponseDto;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.comment.CommentRepository;
import com.ome.repository.recipe.RecipeRepository;
import com.ome.repository.report.ReportRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

	private final ReportRepository reportRepository;
	private final RecipeRepository recipeRepository;
	private final CommentRepository commentRepository;
	private final UserRepository userRepository;
	
	@Transactional
	public String createReport(ReportRequestDto requestDto, Users user) {
		
		Report report = new Report();
		
		report.setUser(user);
		report.setTargetId(requestDto.getTargetId());
		
		switch(requestDto.getTargetType()) {
		case "recipe":
			report.setTargetType(ReportTargetType.RECIPE);
			break;
		case "comment":
			report.setTargetType(ReportTargetType.COMMENT);
			break;
		case "user":
			report.setTargetType(ReportTargetType.USER);
			break;
		}
		
		report.setReason(requestDto.getReason());
		report.setStatus(ReportStatus.PENDING);
		
		reportRepository.save(report);
		
		return "신고가 접수되었습니다";
	}

	@Transactional
	public ReportResponseDto getReport(Long id, Long userId) {
		
		Report report = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("존재하지 않는 신고글입니다"));
		String target;
		
		switch(report.getTargetType()) {
		case ReportTargetType.RECIPE:
			target = recipeRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 레시피입니다")).getTitle();
			break;
		case ReportTargetType.COMMENT:
			target = commentRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 댓글입니다")).getContent();
			break;
		case ReportTargetType.USER:
			target = userRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다")).getUsername();
			break;
		default:
			target = "";
		}
		
		return ReportResponseDto.from(report, target);
	}
}
