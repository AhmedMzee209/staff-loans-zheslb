package com.zheslb.staffloan.dto.request;

import com.zheslb.staffloan.enums.LoanStatus;
import lombok.*;

import java.util.UUID;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplicationRequestDTO {

    private UUID staffId;

    private UUID currentStageId;

    private LoanStatus status;

    private String loanPurpose;

    private BigDecimal requestedAmount;

    private BigDecimal monthlyDeduction;

    private Integer deductionPeriod;
}
