package com.ome.controller.creator;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ome.dto.creator.response.CreatorBookmarkAvgDto;
import com.ome.dto.creator.response.CreatorResponseDto;
import com.ome.service.creator.CreatorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/creators")
@RequiredArgsConstructor
public class CreatorController {
	
	private final CreatorService creatorService;

	/**
	 * 전체 작가 목록 조회
	 * @return
	 */
	@GetMapping
	public ResponseEntity<List<CreatorResponseDto>> getAllCreators(){
		return ResponseEntity.ok(creatorService.getAllCreators());
	}
	
	/**
	 * 작가별 평균 찜수 조회
	 * @return
	 */
    @GetMapping("/avg-bookmarks")
    public ResponseEntity<List<CreatorBookmarkAvgDto>> getAvgBookmarks() {
        return ResponseEntity.ok(creatorService.getAvgBookmarkStats());
    }
	
}
