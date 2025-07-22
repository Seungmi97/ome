package com.ome.domain;

import java.time.LocalDateTime;

import com.ome.common.enums.MemberState;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "membership")
@Getter
@Setter // Setter는 꼭 필요한 경우에만 선언하는 것이 좋습니다.
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Membership {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users user;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_state", nullable = false)
    private MemberState memberState; // FREE, PREMIUM

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;
}

