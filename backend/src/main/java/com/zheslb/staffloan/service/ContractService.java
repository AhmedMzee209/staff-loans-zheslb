package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.request.ContractRequestDTO;
import com.zheslb.staffloan.dto.response.ContractResponseDTO;
import com.zheslb.staffloan.dto.response.ContractVersionResponseDTO;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.model.Contract;
import com.zheslb.staffloan.model.LoanApplication;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.ContractRepository;
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
public class ContractService {

    private final ContractRepository contractRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final UserRepository userRepository;

    public ContractResponseDTO create(ContractRequestDTO requestDTO) {
        LoanApplication application = loanApplicationRepository.findById(requestDTO.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        // Check if contract already exists for this application
        if (contractRepository.findByApplication_ApplicationId(requestDTO.getApplicationId()).isPresent()) {
            throw new IllegalStateException("Contract already exists for this loan application");
        }

        Contract contract = mapToEntity(requestDTO);
        contract.setApplication(application);
        contract.setCreatedAt(Instant.now());
        contract.setUpdatedAt(Instant.now());

        // Set legal officer if provided
        if (requestDTO.getLegalOfficerId() != null) {
            User legalOfficer = userRepository.findById(requestDTO.getLegalOfficerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Legal officer not found"));
            contract.setLegalOfficer(legalOfficer);
        }

        Contract savedContract = contractRepository.save(contract);
        return mapToResponseDTO(savedContract);
    }

    public ContractResponseDTO update(UUID contractId, ContractRequestDTO requestDTO) {
        Contract existing = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        // Update fields
        existing.setDocumentPath(requestDTO.getDocumentPath());
        existing.setCeoApproved(requestDTO.getCeoApproved());
        existing.setStaffSigned(requestDTO.getStaffSigned());
        existing.setUpdatedAt(Instant.now());

        // Update legal officer if provided
        if (requestDTO.getLegalOfficerId() != null) {
            User legalOfficer = userRepository.findById(requestDTO.getLegalOfficerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Legal officer not found"));
            existing.setLegalOfficer(legalOfficer);
        }

        Contract updatedContract = contractRepository.save(existing);
        return mapToResponseDTO(updatedContract);
    }

    public List<ContractResponseDTO> getAll() {
        return contractRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ContractResponseDTO getById(UUID contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        return mapToResponseDTO(contract);
    }

    public ContractResponseDTO getByApplicationId(UUID applicationId) {
        Contract contract = contractRepository.findByApplication_ApplicationId(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found for this application"));

        return mapToResponseDTO(contract);
    }

    public List<ContractResponseDTO> getByLegalOfficer(UUID legalOfficerId) {
        return contractRepository.findByLegalOfficer_UserId(legalOfficerId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ContractResponseDTO> getPendingCeoApproval() {
        return contractRepository.findByCeoApprovedFalse()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ContractResponseDTO> getPendingStaffSignature() {
        return contractRepository.findByStaffSignedFalse()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ContractResponseDTO> getCompletedContracts() {
        return contractRepository.findByCeoApprovedTrueAndStaffSignedTrue()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ContractResponseDTO approveByCeo(UUID contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        contract.setCeoApproved(true);
        contract.setUpdatedAt(Instant.now());

        Contract savedContract = contractRepository.save(contract);
        return mapToResponseDTO(savedContract);
    }

    public ContractResponseDTO signByStaff(UUID contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        if (!contract.getCeoApproved()) {
            throw new IllegalStateException("Contract must be approved by CEO before staff can sign");
        }

        contract.setStaffSigned(true);
        contract.setUpdatedAt(Instant.now());

        Contract savedContract = contractRepository.save(contract);
        return mapToResponseDTO(savedContract);
    }

    public ContractResponseDTO incrementDownloadCount(UUID contractId) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        contract.setDownloadCount(contract.getDownloadCount() + 1);
        contract.setUpdatedAt(Instant.now());

        Contract savedContract = contractRepository.save(contract);
        return mapToResponseDTO(savedContract);
    }

    public void delete(UUID contractId) {
        if (!contractRepository.existsById(contractId)) {
            throw new ResourceNotFoundException("Contract not found");
        }
        contractRepository.deleteById(contractId);
    }

    private Contract mapToEntity(ContractRequestDTO requestDTO) {
        return Contract.builder()
                .documentPath(requestDTO.getDocumentPath())
                .ceoApproved(requestDTO.getCeoApproved() != null ? requestDTO.getCeoApproved() : false)
                .staffSigned(requestDTO.getStaffSigned() != null ? requestDTO.getStaffSigned() : false)
                .downloadCount(0)
                .build();
    }

    private ContractResponseDTO mapToResponseDTO(Contract contract) {
        List<ContractVersionResponseDTO> versionDTOs = null;
        if (contract.getVersions() != null) {
            versionDTOs = contract.getVersions().stream()
                    .map(version -> ContractVersionResponseDTO.builder()
                            .versionId(version.getVersionId())
                            .contractId(version.getContract().getContractId())
                            .documentPath(version.getDocumentPath())
                            .versionNumber(version.getVersionNumber())
                            .changeReason(version.getChangeReason())
                            .createdBy(version.getCreatedBy().getUserId())
                            .createdByName(version.getCreatedBy().getEmail())
                            .createdAt(version.getCreatedAt())
                            .build())
                    .collect(Collectors.toList());
        }

        return ContractResponseDTO.builder()
                .contractId(contract.getContractId())
                .applicationId(contract.getApplication() != null ? contract.getApplication().getApplicationId() : null)
                .legalOfficerId(contract.getLegalOfficer() != null ? contract.getLegalOfficer().getUserId() : null)
                .legalOfficerName(contract.getLegalOfficer() != null ? contract.getLegalOfficer().getEmail() : null)
                .documentPath(contract.getDocumentPath())
                .ceoApproved(contract.getCeoApproved())
                .staffSigned(contract.getStaffSigned())
                .downloadCount(contract.getDownloadCount())
                .createdAt(contract.getCreatedAt())
                .updatedAt(contract.getUpdatedAt())
                .versions(versionDTOs)
                .build();
    }
}
