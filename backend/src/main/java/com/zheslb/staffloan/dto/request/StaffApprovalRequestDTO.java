package com.zheslb.staffloan.dto.request;

import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffApprovalRequestDTO {

    private UUID staffId;

    private UUID hodId;

    private UUID ceoId;

    private Instant hodApprovedAt;

    private Instant ceoApprovedAt;

    private int priorityLevel;

    private String comments;
}
