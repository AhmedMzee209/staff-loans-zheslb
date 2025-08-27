package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, UUID> {

    List<LoanApplication> findByStaffId(UUID staffId);

    List<LoanApplication> findByStatus(com.zheslb.staffloan.enums.LoanStatus status);
}
