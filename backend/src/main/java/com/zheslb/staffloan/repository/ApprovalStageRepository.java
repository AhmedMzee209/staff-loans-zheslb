package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.ApprovalStage;
import com.zheslb.staffloan.enums.StageStatus;
import com.zheslb.staffloan.enums.StageType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ApprovalStageRepository extends JpaRepository<ApprovalStage, UUID> {

    // Find all stages by application
    List<ApprovalStage> findByApplication_ApplicationId(UUID applicationId);

    // Find stage by application and type
    List<ApprovalStage> findByApplication_ApplicationIdAndStageType(UUID applicationId, StageType stageType);

    // Find single stage by application and type
    java.util.Optional<ApprovalStage> findByApplicationAndStageType(com.zheslb.staffloan.model.LoanApplication application, StageType stageType);

    // Find pending stages
    List<ApprovalStage> findByStatus(StageStatus status);

    // Optional: Find by approver
    List<ApprovalStage> findByApprover_UserId(UUID approverId);
}
