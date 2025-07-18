package com.ome.repository.payment;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ome.domain.PayppInfo;
import com.ome.domain.Users;

public interface PayppInfoRepository extends JpaRepository<PayppInfo, Long> {
    Optional<PayppInfo> findByCustomerUid(String customerUid);
    Optional<PayppInfo> findByUser(Users user);
}
