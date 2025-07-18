package com.ome.service.membership;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ome.common.enums.MemberState;
import com.ome.domain.Membership;
import com.ome.repository.membership.MembershipRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class MembershipScheduler {

    private final MembershipRepository membershipRepository;

    // 매일 새벽 2시에 실행 (cron = 초 분 시 일 월 요일)
    @Scheduled(cron = "0 0 2 * * *")
    public void downgradeExpiredPremiumMembers() {
        LocalDateTime now = LocalDateTime.now();
        List<Membership> expiredMembers = membershipRepository.findByMemberStateAndExpiredAtBefore("premium", now);

        for (Membership member : expiredMembers) {
        member.setMemberState(MemberState.free); // 🔥 핵심 수정
        member.setUpdatedAt(now);
        log.info("프리미엄 만료 → free 전환된 사용자: user_id = {}", member.getUser().getId());
}

        membershipRepository.saveAll(expiredMembers);
    }
}