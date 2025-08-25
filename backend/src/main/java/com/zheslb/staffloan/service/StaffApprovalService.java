package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.request.StaffApprovalRequestDTO;
import com.zheslb.staffloan.dto.response.StaffApprovalResponseDTO;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.model.StaffApproval;
import com.zheslb.staffloan.model.StaffProfile;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.StaffApprovalRepository;
import com.zheslb.staffloan.repository.StaffProfileRepository;
import com.zheslb.staffloan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffApprovalService {

    private final StaffApprovalRepository staffApprovalRepository;
    private final StaffProfileRepository staffProfileRepository;
    private final UserRepository userRepository;

    public StaffApprovalResponseDTO create(StaffApprovalRequestDTO requestDTO) {
        StaffProfile staff = staffProfileRepository.findById(requestDTO.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff profile not found"));

        StaffApproval approval = mapToEntity(requestDTO);
        approval.setStaff(staff);
        approval.setCreatedAt(Instant.now());
        approval.setUpdatedAt(Instant.now());

        // Set HOD if provided
        if (requestDTO.getHodId() != null) {
            User hod = userRepository.findById(requestDTO.getHodId())
                    .orElseThrow(() -> new ResourceNotFoundException("HOD user not found"));
            approval.setHod(hod);
        }

        // Set CEO if provided
        if (requestDTO.getCeoId() != null) {
            User ceo = userRepository.findById(requestDTO.getCeoId())
                    .orElseThrow(() -> new ResourceNotFoundException("CEO user not found"));
            approval.setCeo(ceo);
        }

        StaffApproval savedApproval = staffApprovalRepository.save(approval);
        return mapToResponseDTO(savedApproval);
    }

    public StaffApprovalResponseDTO update(UUID approvalId, StaffApprovalRequestDTO requestDTO) {
        StaffApproval existing = staffApprovalRepository.findById(approvalId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff approval not found"));

        // Update fields
        existing.setPriorityLevel(requestDTO.getPriorityLevel());
        existing.setComments(requestDTO.getComments());
        existing.setHodApprovedAt(requestDTO.getHodApprovedAt());
        existing.setCeoApprovedAt(requestDTO.getCeoApprovedAt());
        existing.setUpdatedAt(Instant.now());

        // Update HOD if provided
        if (requestDTO.getHodId() != null) {
            User hod = userRepository.findById(requestDTO.getHodId())
                    .orElseThrow(() -> new ResourceNotFoundException("HOD user not found"));
            existing.setHod(hod);
        }

        // Update CEO if provided
        if (requestDTO.getCeoId() != null) {
            User ceo = userRepository.findById(requestDTO.getCeoId())
                    .orElseThrow(() -> new ResourceNotFoundException("CEO user not found"));
            existing.setCeo(ceo);
        }

        StaffApproval updatedApproval = staffApprovalRepository.save(existing);
        return mapToResponseDTO(updatedApproval);
    }

    public List<StaffApprovalResponseDTO> getAll() {
        return staffApprovalRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public StaffApprovalResponseDTO getById(UUID approvalId) {
        StaffApproval approval = staffApprovalRepository.findById(approvalId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff approval not found"));

        return mapToResponseDTO(approval);
    }

    public List<StaffApprovalResponseDTO> getByStaffId(UUID staffId) {
        return staffApprovalRepository.findByStaff_ProfileId(staffId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public StaffApprovalResponseDTO getByStaffIdAndPriorityLevel(UUID staffId, int priorityLevel) {
        StaffApproval approval = staffApprovalRepository.findByStaff_ProfileIdAndPriorityLevel(staffId, priorityLevel)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Staff approval not found for the given priority level"));

        return mapToResponseDTO(approval);
    }

    public void delete(UUID approvalId) {
        if (!staffApprovalRepository.existsById(approvalId)) {
            throw new ResourceNotFoundException("Staff approval not found");
        }
        staffApprovalRepository.deleteById(approvalId);
    }

    public StaffApprovalResponseDTO approveByHod(UUID approvalId, String comments) {
        StaffApproval approval = staffApprovalRepository.findById(approvalId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff approval not found"));

        approval.setHodApprovedAt(Instant.now());
        approval.setComments(comments);
        approval.setUpdatedAt(Instant.now());

        StaffApproval savedApproval = staffApprovalRepository.save(approval);
        return mapToResponseDTO(savedApproval);
    }

    public StaffApprovalResponseDTO approveByCeo(UUID approvalId, String comments) {
        StaffApproval approval = staffApprovalRepository.findById(approvalId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff approval not found"));

        approval.setCeoApprovedAt(Instant.now());
        approval.setComments(comments);
        approval.setUpdatedAt(Instant.now());

        StaffApproval savedApproval = staffApprovalRepository.save(approval);
        return mapToResponseDTO(savedApproval);
    }

    private StaffApproval mapToEntity(StaffApprovalRequestDTO requestDTO) {
        return StaffApproval.builder()
                .priorityLevel(requestDTO.getPriorityLevel())
                .comments(requestDTO.getComments())
                .hodApprovedAt(requestDTO.getHodApprovedAt())
                .ceoApprovedAt(requestDTO.getCeoApprovedAt())
                .build();
    }

    private StaffApprovalResponseDTO mapToResponseDTO(StaffApproval approval) {
        return StaffApprovalResponseDTO.builder()
                .approvalId(approval.getApprovalId())
                .staffId(approval.getStaff() != null ? approval.getStaff().getProfileId() : null)
                .staffName(approval.getStaff() != null
                        ? approval.getStaff().getFirstName() + " " + approval.getStaff().getLastName()
                        : null)
                .hodId(approval.getHod() != null ? approval.getHod().getUserId() : null)
                .hodName(approval.getHod() != null ? approval.getHod().getEmail() : null)
                .ceoId(approval.getCeo() != null ? approval.getCeo().getUserId() : null)
                .ceoName(approval.getCeo() != null ? approval.getCeo().getEmail() : null)
                .priorityLevel(approval.getPriorityLevel())
                .comments(approval.getComments())
                .hodApprovedAt(approval.getHodApprovedAt())
                .ceoApprovedAt(approval.getCeoApprovedAt())
                .createdAt(approval.getCreatedAt())
                .updatedAt(approval.getUpdatedAt())
                .build();
    }
}
