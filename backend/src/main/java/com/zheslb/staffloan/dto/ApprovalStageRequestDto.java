package com.zheslb.staffloan.dto;

import com.zheslb.staffloan.enums.StageType;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApprovalStageRequestDto {
    private UUID applicationId;
    private StageType stageType;
    private UUID approverId;    // Can be null if pending assignment
    private String comments;
}
