package com.ome.repository.report;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ome.common.enums.ReportTargetType;
import com.ome.domain.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
	Page<Report> findByTargetType(ReportTargetType targetType, Pageable pageable);

	Page<Report> findByReasonContaining(String reason, Pageable pageable);
}
