package com.zheslb.staffloan.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplicationDetailsRequestDTO {

    private String loanPurpose;

    private BigDecimal requestedAmount;

    private BigDecimal monthlyDeduction;

    private Integer deductionPeriod;
}
