package com.zheslb.staffloan.dto;

import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffApprovalResponseDto {
    private UUID approvalId;
    private UUID staffId;
    private UUID hodId;
    private UUID ceoId;
    private int priorityLevel;
    private String comments;
    private Instant hodApprovedAt;
    private Instant ceoApprovedAt;
    private Instant createdAt;
    private Instant updatedAt;
}
