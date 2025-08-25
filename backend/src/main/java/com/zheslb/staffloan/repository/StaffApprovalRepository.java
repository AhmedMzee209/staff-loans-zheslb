package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.StaffApproval;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StaffApprovalRepository extends JpaRepository<StaffApproval, UUID> {

    // Find approvals by staff profile ID
    List<StaffApproval> findByStaff_ProfileId(UUID staffId);

    // Optional: Find approval by staff and priority level
    Optional<StaffApproval> findByStaff_ProfileIdAndPriorityLevel(UUID staffId, int priorityLevel);
}
