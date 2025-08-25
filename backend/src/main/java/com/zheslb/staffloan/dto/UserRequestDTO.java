package com.zheslb.staffloan.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

@Schema(description = "Request payload for creating or updating a user")
public class UserRequestDTO {

    @Schema(description = "User's email address (acts as username)", example = "john.doe@zheslb.com")
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @Schema(description = "User's password", example = "SecurePassword123!")
    private String password;

    @Schema(description = "Role ID to assign to the user", example = "123e4567-e89b-12d3-a456-426614174000")
    @NotNull(message = "Role ID is required")
    private UUID roleId;

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UUID getRoleId() {
        return roleId;
    }

    public void setRoleId(UUID roleId) {
        this.roleId = roleId;
    }
}
