package com.zheslb.staffloan.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserWithRolesDTO {
    
    private UUID userId;
    private String email;
    private Boolean isActive;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    
    private RoleDTO primaryRole;
    private List<UserRoleDetailsDTO> roles;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RoleDTO {
        private UUID roleId;
        private String roleName;
        private String description;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserRoleDetailsDTO {
        private UUID userRoleId;
        private RoleDTO role;
        private OffsetDateTime assignedAt;
        private UUID assignedBy;
        private String assignedByEmail; // For display purposes
        private Boolean isActive;
    }
}