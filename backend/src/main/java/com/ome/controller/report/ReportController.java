package com.ome.controller.report;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.ome.dto.report.request.ReportRequestDto;
import com.ome.dto.report.response.ReportResponseDto;
import com.ome.service.auth.CustomUserDetails;
import com.ome.service.report.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
	
	private final ReportService reportService;

	//신고 생성
	@PostMapping
	public ResponseEntity<String> createReport(@RequestBody ReportRequestDto requestDto,
											   @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(reportService.createReport(requestDto, user.getUser()));
	}
	
	//신고 단일조회
	@GetMapping("/{id}")
	public ResponseEntity<ReportResponseDto> getReport(@PathVariable Long id,
													   @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(reportService.getReport(id, user.getId()));
	}
	
	// 신고 목록조회
	@GetMapping
	public ResponseEntity<Page<ReportResponseDto>> getAllReports(@RequestParam(required = false) String targetType,
																@RequestParam(required = false) String keyword,
																@RequestParam(defaultValue = "0") int page,
																@RequestParam(defaultValue = "10") int size,
																@AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(reportService.getAllReports(targetType, keyword, page, size, user.getId()));
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<String> handleReport(@PathVariable Long id,
											   @RequestBody ReportRequestDto requestDto,
											   @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(reportService.handleReport(id, requestDto, user.getId()));
	}
}
