package com.zheslb.staffloan.dto;

import com.zheslb.staffloan.enums.StageStatus;
import com.zheslb.staffloan.enums.StageType;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApprovalStageResponseDto {
    private UUID stageId;
    private UUID applicationId;
    private StageType stageType;
    private UUID approverId;
    private StageStatus status;
    private String comments;
    private Instant actionDate;
    private Instant createdAt;
}
