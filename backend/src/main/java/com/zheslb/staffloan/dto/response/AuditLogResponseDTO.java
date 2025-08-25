package com.zheslb.staffloan.dto.response;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Response DTO for audit log entries")
public class AuditLogResponseDTO {

    @Schema(description = "Unique identifier for the audit log entry", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID logId;

    @Schema(description = "ID of the user who performed the action", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID userId;

    @Schema(description = "Email of the user who performed the action", example = "john.doe@zheslb.co.tz")
    private String userEmail;

    @Schema(description = "Full name of the user who performed the action", example = "John Doe")
    private String userFullName;

    @Schema(description = "Action performed", example = "CREATE")
    private String action;

    @Schema(description = "Type of entity affected", example = "LoanApplication")
    private String entityType;

    @Schema(description = "ID of the entity affected", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID entityId;

    @Schema(description = "Previous values before the change (JSON format)")
    private JsonNode oldValues;

    @Schema(description = "New values after the change (JSON format)")
    private JsonNode newValues;

    @Schema(description = "IP address of the client who made the request", example = "192.168.1.100")
    private String ipAddress;

    @Schema(description = "Timestamp when the action was performed", example = "2024-08-04T10:30:00Z")
    private Instant createdAt;
}
