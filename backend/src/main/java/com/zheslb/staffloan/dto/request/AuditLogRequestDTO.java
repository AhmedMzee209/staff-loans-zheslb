package com.zheslb.staffloan.dto.request;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Request DTO for creating audit log entries")
public class AuditLogRequestDTO {

    @NotNull(message = "User ID is required")
    @Schema(description = "ID of the user performing the action", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID userId;

    @NotBlank(message = "Action is required")
    @Size(max = 100, message = "Action must not exceed 100 characters")
    @Schema(description = "Action performed", required = true, example = "CREATE", maxLength = 100)
    private String action;

    @NotBlank(message = "Entity type is required")
    @Size(max = 100, message = "Entity type must not exceed 100 characters")
    @Schema(description = "Type of entity affected", required = true, example = "LoanApplication", maxLength = 100)
    private String entityType;

    @Schema(description = "ID of the entity affected", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID entityId;

    @Schema(description = "Previous values before the change (JSON format)")
    private JsonNode oldValues;

    @Schema(description = "New values after the change (JSON format)")
    private JsonNode newValues;

    @Size(max = 45, message = "IP address must not exceed 45 characters")
    @Schema(description = "IP address of the client", example = "192.168.1.100", maxLength = 45)
    private String ipAddress;
}
