package com.zheslb.staffloan.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Schema(description = "Response payload containing user information")
public class UserResponseDTO {

    @Schema(description = "User's unique identifier", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID id;

    @Schema(description = "User's email address", example = "john.doe@zheslb.com")
    private String email;

    @Schema(description = "User's role name", example = "ADMIN")
    private String roleName;

    @Schema(description = "Whether the user is active", example = "true")
    private Boolean isActive;

    public UserResponseDTO() {
    }

    public UserResponseDTO(UUID id, String email, String roleName, Boolean isActive) {
        this.id = id;
        this.email = email;
        this.roleName = roleName;
        this.isActive = isActive;
    }

    // Getters
    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getRoleName() {
        return roleName;
    }

    public Boolean getIsActive() {
        return isActive;
    }
}
