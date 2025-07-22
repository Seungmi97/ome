package com.ome.service.report;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ome.common.enums.ReportStatus;
import com.ome.common.enums.ReportTargetType;
import com.ome.common.enums.Role;
import com.ome.domain.Comment;
import com.ome.domain.Recipe;
import com.ome.domain.Report;
import com.ome.domain.Users;
import com.ome.dto.report.request.ReportRequestDto;
import com.ome.dto.report.response.ReportResponseDto;
import com.ome.repository.auth.UserRepository;
import com.ome.repository.comment.CommentRepository;
import com.ome.repository.recipe.RecipeRepository;
import com.ome.repository.report.ReportRepository;
import com.ome.service.admin.AdminService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

	private final ReportRepository reportRepository;
	private final RecipeRepository recipeRepository;
	private final CommentRepository commentRepository;
	private final UserRepository userRepository;
	private final AdminService adminService;
	
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
		Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다"));
		
		if(user.getRole() != Role.ADMIN) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		String target;
		
		switch(report.getTargetType()) {
		case ReportTargetType.RECIPE:
			target = recipeRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 레시피입니다")).getTitle();
			break;
		case ReportTargetType.COMMENT:
			target = commentRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 댓글입니다")).getContent();
			break;
		case ReportTargetType.USER:
			Users reportedUser = userRepository.findById(report.getTargetId()).orElse(null);
			if(reportedUser != null) {
				target = reportedUser.getUsername();
			} else {
				target = "삭제된 사용자";
			}
			break;
		default:
			target = "";
		}
		
		return ReportResponseDto.from(report, target);
	}

	@Transactional
	public Page<ReportResponseDto> getAllReports(String targetType, String keyword, int page, int size, Long userId) {
		
		Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다"));
		
		if(user.getRole() != Role.ADMIN) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		Pageable pageable = PageRequest.of(page, size);
		
		Page<Report> reportPage;
		
		if(targetType != null && !targetType.isEmpty()) {
			ReportTargetType type;
			switch(targetType) {
			case "recipe":
				type = ReportTargetType.RECIPE;
				break;
			case "comment":
				type = ReportTargetType.COMMENT;
				break;
			case "user":
				type = ReportTargetType.USER;
				break;
			default:
				throw new RuntimeException("targetType is null"); 
			}
			reportPage = reportRepository.findByTargetType(type, pageable);
		} else if(keyword != null && !keyword.isEmpty()) {
			reportPage = reportRepository.findByReasonContaining(keyword, pageable);
		} else {
			reportPage = reportRepository.findAll(pageable);
		}
		
		return reportPage.map(report -> {
			String target;
			
			switch(report.getTargetType()) {
			case ReportTargetType.RECIPE:
				target = recipeRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 레시피입니다")).getTitle();
				break;
			case ReportTargetType.COMMENT:
				target = commentRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 댓글입니다")).getContent();
				break;
			case ReportTargetType.USER:
				Users reportedUser = userRepository.findById(report.getTargetId()).orElse(null);
				if(reportedUser != null) {
					target = reportedUser.getUsername();
				} else {
					target = "삭제된 사용자";
				}
				break;
			default:
				target = "";
			}
			
			return ReportResponseDto.from(report, target);
		});
	}

	@Transactional
	public String handleReport(Long id, ReportRequestDto requestDto, Long userId) {
		
		Report report = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("존재하지 않는 신고글입니다"));
		Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다"));
		
		if(user.getRole() != Role.ADMIN) {
			throw new AccessDeniedException("권한이 없습니다");
		}
		
		if(requestDto.getStatus().equalsIgnoreCase(ReportStatus.APPROVED.toString())) {
			switch(report.getTargetType()) {
			case ReportTargetType.RECIPE:
				Recipe recipe = recipeRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 레시피입니다"));
				recipe.setReported(true);
				break;
			case ReportTargetType.COMMENT:
				Comment comment = commentRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 댓글입니다"));
				comment.setReported(true);
				break;
			case ReportTargetType.USER:
				Users reportedUser = userRepository.findById(report.getTargetId()).orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다"));
				adminService.deleteUserHard(reportedUser.getUserId());
				break;
			default:
			}
			
			report.setStatus(ReportStatus.APPROVED);
		} else {
			report.setStatus(ReportStatus.REJECTED);
		}
		
		
		return "신고가 처리되었습니다";
	}
}
