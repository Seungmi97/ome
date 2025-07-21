package com.ome.repository.payment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ome.domain.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByPgTid(String pgTid);

    List<Payment> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);


}

