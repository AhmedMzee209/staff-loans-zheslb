package com.zheslb.staffloan.model;

import com.zheslb.staffloan.enums.StageStatus;
import com.zheslb.staffloan.enums.StageType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "approval_stages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApprovalStage {

    @Id
    @GeneratedValue
    @Column(name = "stage_id")
    private UUID stageId;

    @ManyToOne
    @JoinColumn(name = "application_id", nullable = false)
    private LoanApplication application;

    @Enumerated(EnumType.STRING)
    @Column(name = "stage_type", nullable = false)
    private StageType stageType;

    @ManyToOne
    @JoinColumn(name = "approver_id")
    private User approver;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StageStatus status = StageStatus.PENDING;

    private String comments;

    private Instant actionDate;

    @CreationTimestamp
    private Instant createdAt;
}
