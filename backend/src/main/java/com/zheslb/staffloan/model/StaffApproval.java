package com.zheslb.staffloan.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "staff_approvals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffApproval {

    @Id
    @GeneratedValue
    @Column(name = "approval_id")
    private UUID approvalId;

    @ManyToOne
    @JoinColumn(name = "staff_id", nullable = false)
    private StaffProfile staff;

    @ManyToOne
    @JoinColumn(name = "hod_id")
    private User hod;

    @ManyToOne
    @JoinColumn(name = "ceo_id")
    private User ceo;

    private Instant hodApprovedAt;

    private Instant ceoApprovedAt;

    @Column(nullable = false)
    private int priorityLevel;

    private String comments;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;
}
