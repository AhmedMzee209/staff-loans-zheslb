package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.request.LoanApplicationRequestDTO;
import com.zheslb.staffloan.dto.response.LoanApplicationResponseDTO;
import com.zheslb.staffloan.dto.response.LoanApplicationDetailsResponseDTO;
import com.zheslb.staffloan.enums.PriorityLevel;
import com.zheslb.staffloan.model.LoanApplication;
import com.zheslb.staffloan.model.LoanApplicationDetails;
import com.zheslb.staffloan.enums.LoanStatus;
import com.zheslb.staffloan.model.ApprovalStage;
import com.zheslb.staffloan.repository.ApprovalStageRepository;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.repository.LoanApplicationRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LoanApplicationService {
    private final LoanApplicationRepository loanApplicationRepository;
    private final ApprovalStageRepository approvalStageRepository;

    public LoanApplicationService(LoanApplicationRepository loanApplicationRepository,
                                 ApprovalStageRepository approvalStageRepository) {
        this.loanApplicationRepository = loanApplicationRepository;
        this.approvalStageRepository = approvalStageRepository;
    }
    // Returns all loan applications with details for a user
    public List<LoanApplicationResponseDTO> findApplicationsWithDetailsByUserId(UUID userId) {
        List<LoanApplication> applications = loanApplicationRepository.findByStaffId(userId);
        return applications.stream()
            .map(this::mapToResponseDTO)
            .collect(java.util.stream.Collectors.toList());
    }

    // ...existing code...

    public LoanApplicationResponseDTO create(LoanApplicationRequestDTO requestDTO) {
        LoanApplication application = mapToEntity(requestDTO);
        // Set status to SUBMITTED if provided, else DRAFT
        application.setStatus(requestDTO.getStatus() != null ? requestDTO.getStatus() : LoanStatus.DRAFT);
        application.setCreatedAt(Instant.now());
        application.setUpdatedAt(Instant.now());

        // Automatically create LoanApplicationDetails
        LoanApplicationDetails details = LoanApplicationDetails.builder()
            .loanPurpose(requestDTO.getLoanPurpose())
            .requestedAmount(requestDTO.getRequestedAmount())
            .monthlyDeduction(requestDTO.getMonthlyDeduction())
            .deductionPeriod(requestDTO.getDeductionPeriod() != null ? requestDTO.getDeductionPeriod() : 0)
            .loanApplication(application)
            .build();
        application.setDetails(details);

        LoanApplication saved = loanApplicationRepository.save(application);

        // Automatically create CEO review stage for first submission
        if (application.getStatus() == LoanStatus.SUBMITTED) {
            ApprovalStage ceoStage = ApprovalStage.builder()
                .application(saved)
                .stageType(com.zheslb.staffloan.enums.StageType.CEO)
                .status(com.zheslb.staffloan.enums.StageStatus.PENDING)
                .build();
            approvalStageRepository.save(ceoStage);
        }

        return mapToResponseDTO(saved);
    }

    public LoanApplicationResponseDTO update(UUID applicationId, LoanApplicationRequestDTO requestDTO) {
        LoanApplication existing = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        existing.setStatus(requestDTO.getStatus());
        existing.setCurrentStageId(requestDTO.getCurrentStageId());
        existing.setUpdatedAt(Instant.now());

        LoanApplication updated = loanApplicationRepository.save(existing);
        return mapToResponseDTO(updated);
    }

    public List<LoanApplicationResponseDTO> getAll() {
        return loanApplicationRepository.findAll()
            .stream()
            .map(this::mapToResponseDTO)
            .collect(Collectors.toList());
    }

    public List<LoanApplicationResponseDTO> getByStatus(LoanStatus status) {
        return loanApplicationRepository.findByStatus(status)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public LoanApplicationResponseDTO getById(UUID applicationId) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        return mapToResponseDTO(application);
    }

    public void delete(UUID applicationId) {
        if (!loanApplicationRepository.existsById(applicationId)) {
            throw new ResourceNotFoundException("Loan application not found");
        }
        loanApplicationRepository.deleteById(applicationId);
    }

    public LoanApplicationResponseDTO updatePriority(UUID applicationId, PriorityLevel priority) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));
        application.setPriority(priority);
        application.setUpdatedAt(Instant.now());
        LoanApplication saved = loanApplicationRepository.save(application);
        return mapToResponseDTO(saved);
    }

    public LoanApplicationResponseDTO assignPriorityByCEO(UUID applicationId, PriorityLevel priority, String comments) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));
        
        // Set priority
        application.setPriority(priority);
        application.setUpdatedAt(Instant.now());
        
        // Save the application
        LoanApplication saved = loanApplicationRepository.save(application);
        
        // TODO: Log this priority assignment action for audit trail
        // This could be enhanced to save CEO comments in approval stages
        
        return mapToResponseDTO(saved);
    }

    public LoanApplicationResponseDTO approveByCEO(UUID applicationId, String decision, String comments, String strategicNotes) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        // Update application status based on CEO decision
        if ("APPROVED".equals(decision)) {
            application.setStatus(LoanStatus.HOD_REVIEW); // Forward to HOD
            
            // Create HOD approval stage
            ApprovalStage hodStage = ApprovalStage.builder()
                .application(application)
                .stageType(com.zheslb.staffloan.enums.StageType.HOD)
                .status(com.zheslb.staffloan.enums.StageStatus.PENDING)
                .approver(null) // Will be assigned when HOD picks up the task
                .build();
            approvalStageRepository.save(hodStage);
            
        } else if ("REJECTED".equals(decision)) {
            application.setStatus(LoanStatus.REJECTED);
        } else if ("DEFERRED".equals(decision)) {
            application.setStatus(LoanStatus.DRAFT); // Return to draft for more info
        }

        // Update CEO approval stage to completed
        ApprovalStage ceoStage = approvalStageRepository.findByApplicationAndStageType(
            application, com.zheslb.staffloan.enums.StageType.CEO
        ).orElse(null);
        
        if (ceoStage != null) {
            ceoStage.setStatus("APPROVED".equals(decision) ? 
                com.zheslb.staffloan.enums.StageStatus.APPROVED : 
                com.zheslb.staffloan.enums.StageStatus.REJECTED);
            ceoStage.setComments(comments);
            ceoStage.setActionDate(Instant.now());
            approvalStageRepository.save(ceoStage);
        }

        application.setUpdatedAt(Instant.now());
        LoanApplication saved = loanApplicationRepository.save(application);
        
        return mapToResponseDTO(saved);
    }

    public com.zheslb.staffloan.dto.response.CEOStatsResponseDTO getCEOStatistics() {
        // Get all applications
        List<LoanApplication> allApplications = loanApplicationRepository.findAll();
        
        // Count total applications
        long totalApplications = allApplications.size();
        
        // Count pending CEO review (applications with status CEO_REVIEW)
        long pendingCEOReview = allApplications.stream()
                .filter(app -> app.getStatus() == LoanStatus.CEO_REVIEW)
                .count();
        
        // Count applications approved by CEO (those that moved beyond CEO_REVIEW)
        // This includes HOD_REVIEW, ACCOUNTANT_REVIEW, LEGAL_REVIEW, and APPROVED
        long approvedByCEO = allApplications.stream()
                .filter(app -> app.getStatus() == LoanStatus.HOD_REVIEW || 
                              app.getStatus() == LoanStatus.ACCOUNTANT_REVIEW ||
                              app.getStatus() == LoanStatus.LEGAL_REVIEW ||
                              app.getStatus() == LoanStatus.APPROVED)
                .count();
        
        // Count rejected loans
        long rejectedLoans = allApplications.stream()
                .filter(app -> app.getStatus() == LoanStatus.REJECTED)
                .count();
        
        // Calculate total amount approved by CEO
        double totalAmountApproved = allApplications.stream()
                .filter(app -> app.getStatus() == LoanStatus.HOD_REVIEW || 
                              app.getStatus() == LoanStatus.ACCOUNTANT_REVIEW ||
                              app.getStatus() == LoanStatus.LEGAL_REVIEW ||
                              app.getStatus() == LoanStatus.APPROVED)
                .filter(app -> app.getDetails() != null && app.getDetails().getRequestedAmount() != null)
                .mapToDouble(app -> app.getDetails().getRequestedAmount().doubleValue())
                .sum();
        
        // Calculate average processing time (simplified - from created to updated)
        double averageProcessingTime = allApplications.stream()
                .filter(app -> app.getStatus() != LoanStatus.DRAFT && app.getStatus() != LoanStatus.SUBMITTED)
                .mapToLong(app -> java.time.Duration.between(app.getCreatedAt(), app.getUpdatedAt()).toDays())
                .average()
                .orElse(0.0);
        
        // Count applications by priority
        long highPriority = allApplications.stream()
                .filter(app -> app.getPriority() == PriorityLevel.HIGH)
                .count();
        
        long mediumPriority = allApplications.stream()
                .filter(app -> app.getPriority() == PriorityLevel.MEDIUM)
                .count();
        
        long lowPriority = allApplications.stream()
                .filter(app -> app.getPriority() == PriorityLevel.LOW)
                .count();
        
        long unassignedPriority = allApplications.stream()
                .filter(app -> app.getPriority() == null)
                .count();
        
        com.zheslb.staffloan.dto.response.CEOStatsResponseDTO.ApplicationsByPriority priorityStats = 
            com.zheslb.staffloan.dto.response.CEOStatsResponseDTO.ApplicationsByPriority.builder()
                .high(highPriority)
                .medium(mediumPriority)
                .low(lowPriority)
                .unassigned(unassignedPriority)
                .build();
        
        return com.zheslb.staffloan.dto.response.CEOStatsResponseDTO.builder()
                .totalApplications(totalApplications)
                .pendingCEOReview(pendingCEOReview)
                .approvedByCEO(approvedByCEO)
                .rejectedLoans(rejectedLoans)
                .totalAmountApproved(totalAmountApproved)
                .averageProcessingTime(averageProcessingTime)
                .applicationsByPriority(priorityStats)
                .build();
    }

    private LoanApplication mapToEntity(LoanApplicationRequestDTO requestDTO) {
        return LoanApplication.builder()
                .staffId(requestDTO.getStaffId())
                .currentStageId(requestDTO.getCurrentStageId())
                .status(requestDTO.getStatus())
                .build();
    }

    private LoanApplicationResponseDTO mapToResponseDTO(LoanApplication application) {
        LoanApplicationDetailsResponseDTO detailsDTO = null;
        if (application.getDetails() != null) {
            detailsDTO = LoanApplicationDetailsResponseDTO.builder()
                    .detailsId(application.getDetails().getDetailsId())
                    .loanPurpose(application.getDetails().getLoanPurpose())
                    .requestedAmount(application.getDetails().getRequestedAmount())
                    .monthlyDeduction(application.getDetails().getMonthlyDeduction())
                    .deductionPeriod(application.getDetails().getDeductionPeriod())
                    .build();
        }

        return LoanApplicationResponseDTO.builder()
                .applicationId(application.getApplicationId())
                .staffId(application.getStaffId())
                .currentStageId(application.getCurrentStageId())
                .status(application.getStatus())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .details(detailsDTO)
                .priority(application.getPriority())
                .build();
    }
}
