package com.zheslb.staffloan.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Current authenticated user information")
public class CurrentUserDTO {

    @Schema(description = "User unique identifier", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID userId;

    @Schema(description = "User's email address", example = "john.doe@zheslb.co.tz")
    private String email;

    @Schema(description = "User's role information")
    private RoleInfo role;

    @Schema(description = "Whether the user account is active", example = "true")
    private Boolean isActive;

    @Schema(description = "Account creation timestamp", example = "2024-08-04T10:30:00Z")
    private OffsetDateTime createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "User role information")
    public static class RoleInfo {
        @Schema(description = "Role unique identifier", example = "123e4567-e89b-12d3-a456-426614174000")
        private UUID roleId;

        @Schema(description = "Role name", example = "ADMIN")
        private String roleName;

        @Schema(description = "Role description", example = "System Administrator")
        private String description;
    }
}
