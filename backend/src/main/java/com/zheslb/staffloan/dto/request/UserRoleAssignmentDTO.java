package com.zheslb.staffloan.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRoleAssignmentDTO {
    
    @NotNull(message = "User ID is required")
    private UUID userId;
    
    @NotEmpty(message = "At least one role must be specified")
    private List<UUID> roleIds;
    
    private UUID primaryRoleId; // Optional: specify which role should be primary
}