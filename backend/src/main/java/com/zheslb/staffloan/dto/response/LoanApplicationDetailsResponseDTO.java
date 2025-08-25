package com.zheslb.staffloan.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplicationDetailsResponseDTO {

    private UUID detailsId;

    private String loanPurpose;

    private BigDecimal requestedAmount;

    private BigDecimal monthlyDeduction;

    private Integer deductionPeriod;
}
