package com.ome.repository.recipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ome.common.enums.TargetType;
import com.ome.domain.Media;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long>{
	
	// 특정 대상(RECIPE, REVIEW)에 대한 미디어 목록 조회
    List<Media> findByTargetTypeAndTargetIdOrderBySeqAsc(TargetType targetType, Long targetId);

    // 특정 레시피에 연결된 미디어 모두 삭제
    void deleteByTargetTypeAndTargetId(TargetType targetType, Long targetId);
}
