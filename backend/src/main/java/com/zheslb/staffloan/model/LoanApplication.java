package com.zheslb.staffloan.model;

import com.zheslb.staffloan.enums.LoanStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "loan_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplication {

    @Id
    @GeneratedValue
    @Column(name = "application_id")
    private UUID applicationId;

    @Column(name = "staff_id", nullable = false)
    private UUID staffId;

    @Column(name = "current_stage_id")
    private UUID currentStageId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private LoanStatus status = LoanStatus.DRAFT;

    @OneToOne(mappedBy = "loanApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private LoanApplicationDetails details;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private com.zheslb.staffloan.enums.PriorityLevel priority;

    @Column(name = "created_at", nullable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    @Builder.Default
    private Instant updatedAt = Instant.now();
}
