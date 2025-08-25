package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.request.ContractVersionRequestDTO;
import com.zheslb.staffloan.dto.response.ContractVersionResponseDTO;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.model.Contract;
import com.zheslb.staffloan.model.ContractVersion;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.ContractRepository;
import com.zheslb.staffloan.repository.ContractVersionRepository;
import com.zheslb.staffloan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractVersionService {

    private final ContractVersionRepository contractVersionRepository;
    private final ContractRepository contractRepository;
    private final UserRepository userRepository;

    public ContractVersionResponseDTO create(ContractVersionRequestDTO requestDTO) {
        Contract contract = contractRepository.findById(requestDTO.getContractId())
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

        User createdBy = userRepository.findById(requestDTO.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Get next version number
        Integer nextVersionNumber = contractVersionRepository
                .getMaxVersionNumberByContractId(requestDTO.getContractId()) + 1;

        ContractVersion version = mapToEntity(requestDTO);
        version.setContract(contract);
        version.setCreatedBy(createdBy);
        version.setVersionNumber(nextVersionNumber);
        version.setCreatedAt(Instant.now());

        ContractVersion savedVersion = contractVersionRepository.save(version);
        return mapToResponseDTO(savedVersion);
    }

    public ContractVersionResponseDTO update(UUID versionId, ContractVersionRequestDTO requestDTO) {
        ContractVersion existing = contractVersionRepository.findById(versionId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract version not found"));

        // Update fields
        existing.setDocumentPath(requestDTO.getDocumentPath());
        existing.setChangeReason(requestDTO.getChangeReason());

        // Update created by if provided
        if (requestDTO.getCreatedBy() != null) {
            User createdBy = userRepository.findById(requestDTO.getCreatedBy())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            existing.setCreatedBy(createdBy);
        }

        ContractVersion updatedVersion = contractVersionRepository.save(existing);
        return mapToResponseDTO(updatedVersion);
    }

    public List<ContractVersionResponseDTO> getAll() {
        return contractVersionRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ContractVersionResponseDTO getById(UUID versionId) {
        ContractVersion version = contractVersionRepository.findById(versionId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract version not found"));

        return mapToResponseDTO(version);
    }

    public List<ContractVersionResponseDTO> getByContractId(UUID contractId) {
        return contractVersionRepository.findByContract_ContractIdOrderByVersionNumberDesc(contractId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ContractVersionResponseDTO getLatestVersion(UUID contractId) {
        ContractVersion version = contractVersionRepository.findLatestVersionByContractId(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("No versions found for this contract"));

        return mapToResponseDTO(version);
    }

    public List<ContractVersionResponseDTO> getByCreatedBy(UUID userId) {
        return contractVersionRepository.findByCreatedBy_UserId(userId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public void delete(UUID versionId) {
        if (!contractVersionRepository.existsById(versionId)) {
            throw new ResourceNotFoundException("Contract version not found");
        }
        contractVersionRepository.deleteById(versionId);
    }

    public ContractVersionResponseDTO createNewVersion(UUID contractId, String documentPath, String changeReason,
            UUID createdBy) {
        ContractVersionRequestDTO requestDTO = ContractVersionRequestDTO.builder()
                .contractId(contractId)
                .documentPath(documentPath)
                .changeReason(changeReason)
                .createdBy(createdBy)
                .build();

        return create(requestDTO);
    }

    private ContractVersion mapToEntity(ContractVersionRequestDTO requestDTO) {
        return ContractVersion.builder()
                .documentPath(requestDTO.getDocumentPath())
                .changeReason(requestDTO.getChangeReason())
                .build();
    }

    private ContractVersionResponseDTO mapToResponseDTO(ContractVersion version) {
        return ContractVersionResponseDTO.builder()
                .versionId(version.getVersionId())
                .contractId(version.getContract() != null ? version.getContract().getContractId() : null)
                .documentPath(version.getDocumentPath())
                .versionNumber(version.getVersionNumber())
                .changeReason(version.getChangeReason())
                .createdBy(version.getCreatedBy() != null ? version.getCreatedBy().getUserId() : null)
                .createdByName(version.getCreatedBy() != null ? version.getCreatedBy().getEmail() : null)
                .createdAt(version.getCreatedAt())
                .build();
    }
}
