package com.zheslb.staffloan.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffApprovalRequestDto {
    private UUID staffId;      // Refers to StaffProfile
    private UUID hodId;        // Optional: User who approves
    private UUID ceoId;        // Optional: User who approves
    private int priorityLevel;
    private String comments;
}
