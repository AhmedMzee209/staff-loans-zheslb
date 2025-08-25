package com.zheslb.staffloan.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "loan_application_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanApplicationDetails {

    @Id
    @GeneratedValue
    @Column(name = "details_id")
    private UUID detailsId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false, unique = true)
    private LoanApplication loanApplication;

    @Column(name = "loan_purpose", columnDefinition = "TEXT", nullable = false)
    private String loanPurpose;

    @Column(name = "requested_amount", nullable = false)
    private BigDecimal requestedAmount;

    @Column(name = "monthly_deduction", nullable = false)
    private BigDecimal monthlyDeduction;

    @Column(name = "deduction_period", nullable = false)
    private int deductionPeriod; // in months
}
