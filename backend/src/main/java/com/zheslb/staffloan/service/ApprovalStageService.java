package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.request.ApprovalStageRequestDTO;
import com.zheslb.staffloan.dto.response.ApprovalStageResponseDTO;
import com.zheslb.staffloan.enums.StageStatus;
import com.zheslb.staffloan.enums.StageType;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.model.ApprovalStage;
import com.zheslb.staffloan.model.LoanApplication;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.ApprovalStageRepository;
import com.zheslb.staffloan.repository.LoanApplicationRepository;
import com.zheslb.staffloan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApprovalStageService {

    private final ApprovalStageRepository approvalStageRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final UserRepository userRepository;

    public ApprovalStageResponseDTO create(ApprovalStageRequestDTO requestDTO) {
        LoanApplication application = loanApplicationRepository.findById(requestDTO.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        ApprovalStage stage = mapToEntity(requestDTO);
        stage.setApplication(application);
        stage.setCreatedAt(Instant.now());

        // Set approver if provided
        if (requestDTO.getApproverId() != null) {
            User approver = userRepository.findById(requestDTO.getApproverId())
                    .orElseThrow(() -> new ResourceNotFoundException("Approver user not found"));
            stage.setApprover(approver);
        }

        ApprovalStage savedStage = approvalStageRepository.save(stage);
        return mapToResponseDTO(savedStage);
    }

    public ApprovalStageResponseDTO update(UUID stageId, ApprovalStageRequestDTO requestDTO) {
        ApprovalStage existing = approvalStageRepository.findById(stageId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval stage not found"));

        // Update fields
        existing.setStageType(requestDTO.getStageType());
        existing.setStatus(requestDTO.getStatus());
        existing.setComments(requestDTO.getComments());
        existing.setActionDate(requestDTO.getActionDate());

        // Update approver if provided
        if (requestDTO.getApproverId() != null) {
            User approver = userRepository.findById(requestDTO.getApproverId())
                    .orElseThrow(() -> new ResourceNotFoundException("Approver user not found"));
            existing.setApprover(approver);
        }

        ApprovalStage updatedStage = approvalStageRepository.save(existing);
        return mapToResponseDTO(updatedStage);
    }

    public List<ApprovalStageResponseDTO> getAll() {
        return approvalStageRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ApprovalStageResponseDTO getById(UUID stageId) {
        ApprovalStage stage = approvalStageRepository.findById(stageId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval stage not found"));

        return mapToResponseDTO(stage);
    }

    public List<ApprovalStageResponseDTO> getByApplicationId(UUID applicationId) {
        return approvalStageRepository.findByApplication_ApplicationId(applicationId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ApprovalStageResponseDTO> getByApplicationIdAndStageType(UUID applicationId, StageType stageType) {
        return approvalStageRepository.findByApplication_ApplicationIdAndStageType(applicationId, stageType)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ApprovalStageResponseDTO> getPendingStages() {
        return approvalStageRepository.findByStatus(StageStatus.PENDING)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public void delete(UUID stageId) {
        if (!approvalStageRepository.existsById(stageId)) {
            throw new ResourceNotFoundException("Approval stage not found");
        }
        approvalStageRepository.deleteById(stageId);
    }

    public ApprovalStageResponseDTO approve(UUID stageId, String comments) {
        ApprovalStage stage = approvalStageRepository.findById(stageId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval stage not found"));

        stage.setStatus(StageStatus.APPROVED);
        stage.setComments(comments);
        stage.setActionDate(Instant.now());

        ApprovalStage savedStage = approvalStageRepository.save(stage);
        return mapToResponseDTO(savedStage);
    }

    public ApprovalStageResponseDTO reject(UUID stageId, String comments) {
        ApprovalStage stage = approvalStageRepository.findById(stageId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval stage not found"));

        stage.setStatus(StageStatus.REJECTED);
        stage.setComments(comments);
        stage.setActionDate(Instant.now());

        ApprovalStage savedStage = approvalStageRepository.save(stage);
        return mapToResponseDTO(savedStage);
    }

    public ApprovalStageResponseDTO returnForRevision(UUID stageId, String comments) {
        ApprovalStage stage = approvalStageRepository.findById(stageId)
                .orElseThrow(() -> new ResourceNotFoundException("Approval stage not found"));

        stage.setStatus(StageStatus.RETURNED);
        stage.setComments(comments);
        stage.setActionDate(Instant.now());

        ApprovalStage savedStage = approvalStageRepository.save(stage);
        return mapToResponseDTO(savedStage);
    }

    public List<ApprovalStageResponseDTO> createStagesForApplication(UUID applicationId) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        // Create all required stages
        List<ApprovalStage> stages = List.of(
                ApprovalStage.builder()
                        .application(application)
                        .stageType(StageType.HOD)
                        .status(StageStatus.PENDING)
                        .createdAt(Instant.now())
                        .build(),
                ApprovalStage.builder()
                        .application(application)
                        .stageType(StageType.ACCOUNTANT)
                        .status(StageStatus.PENDING)
                        .createdAt(Instant.now())
                        .build(),
                ApprovalStage.builder()
                        .application(application)
                        .stageType(StageType.CEO)
                        .status(StageStatus.PENDING)
                        .createdAt(Instant.now())
                        .build(),
                ApprovalStage.builder()
                        .application(application)
                        .stageType(StageType.LEGAL)
                        .status(StageStatus.PENDING)
                        .createdAt(Instant.now())
                        .build());

        List<ApprovalStage> savedStages = approvalStageRepository.saveAll(stages);
        return savedStages.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private ApprovalStage mapToEntity(ApprovalStageRequestDTO requestDTO) {
        return ApprovalStage.builder()
                .stageType(requestDTO.getStageType())
                .status(requestDTO.getStatus() != null ? requestDTO.getStatus() : StageStatus.PENDING)
                .comments(requestDTO.getComments())
                .actionDate(requestDTO.getActionDate())
                .build();
    }

    private ApprovalStageResponseDTO mapToResponseDTO(ApprovalStage stage) {
        return ApprovalStageResponseDTO.builder()
                .stageId(stage.getStageId())
                .applicationId(stage.getApplication() != null ? stage.getApplication().getApplicationId() : null)
                .stageType(stage.getStageType())
                .approverId(stage.getApprover() != null ? stage.getApprover().getUserId() : null)
                .approverName(stage.getApprover() != null ? stage.getApprover().getEmail() : null)
                .status(stage.getStatus())
                .comments(stage.getComments())
                .actionDate(stage.getActionDate())
                .createdAt(stage.getCreatedAt())
                .build();
    }
}
