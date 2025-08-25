package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.LoanApplicationDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LoanApplicationDetailsRepository extends JpaRepository<LoanApplicationDetails, UUID> {

    LoanApplicationDetails findByLoanApplication_ApplicationId(UUID applicationId);
}
