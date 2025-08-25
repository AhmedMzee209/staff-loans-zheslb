package com.zheslb.staffloan.dto.request;

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
public class ApprovalStageRequestDTO {

    private UUID applicationId;

    private StageType stageType;

    private UUID approverId;

    private StageStatus status;

    private String comments;

    private Instant actionDate;
}
