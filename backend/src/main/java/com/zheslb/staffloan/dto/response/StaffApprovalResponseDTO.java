package com.zheslb.staffloan.dto.response;

import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffApprovalResponseDTO {

    private UUID approvalId;

    private UUID staffId;

    private String staffName;

    private UUID hodId;

    private String hodName;

    private UUID ceoId;

    private String ceoName;

    private Instant hodApprovedAt;

    private Instant ceoApprovedAt;

    private int priorityLevel;

    private String comments;

    private Instant createdAt;

    private Instant updatedAt;
}
