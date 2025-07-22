package com.ome.service.creator;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ome.dto.creator.response.CreatorBookmarkAvgDto;
import com.ome.dto.creator.response.CreatorResponseDto;
import com.ome.repository.auth.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreatorService {
	
	private final UserRepository userRepository;

	/**
	 * 전체 작가 목록 조회
	 * @return
	 */
	public List<CreatorResponseDto> getAllCreators() {
	    return userRepository.findAllCreators();
	}
	
	/**
	 * 작가별 평균 찜수 조회
	 * @return
	 */
    public List<CreatorBookmarkAvgDto> getAvgBookmarkStats() {
        return userRepository.getCreatorsWithBookmarkAvg();
    }
	
	
}
