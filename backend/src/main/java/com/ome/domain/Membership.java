package com.ome.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "membership")
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memId;

    // 🔧 User 도메인 아직 미구현이라 주석 처리 or 나중에 OneToOne 교체
    // @OneToOne
    // @JoinColumn(name = "user_id", nullable = false)
    // private User user;

    @Column(name = "user_id", nullable = false)
    private Long userId;  // ← 임시 대체

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberState memberState;

    private LocalDateTime updatedAt;

    private LocalDateTime expiredAt;
}
