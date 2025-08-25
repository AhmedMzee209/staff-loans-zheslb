package com.zheslb.staffloan.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "User registration request - only admins can register new users")
public class RegisterRequestDTO {

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Schema(description = "User's email address", required = true, example = "john.doe@zheslb.co.tz")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Schema(description = "User's password", required = true, example = "password123", minLength = 6)
    private String password;

    @NotNull(message = "Role ID is required")
    @Schema(description = "Role ID to assign to the user", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID roleId;

    @Schema(description = "Whether the user account is active", example = "true", defaultValue = "true")
    @Builder.Default
    private Boolean isActive = true;
}
