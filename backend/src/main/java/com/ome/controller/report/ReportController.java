package com.ome.controller.report;

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

	@PostMapping
	public ResponseEntity<String> createReport(@RequestBody ReportRequestDto requestDto,
											   @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(reportService.createReport(requestDto, user.getUser()));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ReportResponseDto> getReport(@PathVariable Long id,
													   @AuthenticationPrincipal CustomUserDetails user){
		return ResponseEntity.ok(reportService.getReport(id, user.getId()));
	}
}
