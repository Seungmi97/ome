package com.ome.repository.report;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ome.domain.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {

}
