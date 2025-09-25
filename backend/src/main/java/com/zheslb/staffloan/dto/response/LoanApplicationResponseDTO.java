package com.zheslb.staffloan.dto.response;

import com.zheslb.staffloan.enums.LoanStatus;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplicationResponseDTO {

    private UUID applicationId;

    private UUID staffId;

    private UUID currentStageId;

    private LoanStatus status;

    private Instant createdAt;

    private Instant updatedAt;

    private LoanApplicationDetailsResponseDTO details;

    private com.zheslb.staffloan.enums.PriorityLevel priority;
}
