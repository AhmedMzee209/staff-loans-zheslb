package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.AuditLogRequestDTO;
import com.zheslb.staffloan.dto.response.AuditLogResponseDTO;
import com.zheslb.staffloan.service.AuditLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/audit-logs")
@RequiredArgsConstructor
@Tag(name = "Audit Logs", description = "APIs for managing and viewing audit logs - tracks all CRUD operations in the system")
public class AuditLogController {

    private final AuditLogService auditLogService;

    @Operation(summary = "Create audit log", description = "Creates a new audit log entry manually. Normally audit logs are created automatically by the system.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Audit log created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "404", description = "Referenced user not found")
    })
    @PostMapping
    public ResponseEntity<AuditLogResponseDTO> create(@Valid @RequestBody AuditLogRequestDTO requestDTO) {
        AuditLogResponseDTO response = auditLogService.create(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all audit logs", description = "Retrieves all audit logs with pagination support")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Page.class)))
    })
    @GetMapping
    public ResponseEntity<Page<AuditLogResponseDTO>> getAll(
            @Parameter(description = "Page number (0-based)", example = "0") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size", example = "20") @RequestParam(defaultValue = "20") int size) {
        Page<AuditLogResponseDTO> response = auditLogService.getAll(page, size);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get all audit logs (no pagination)", description = "Retrieves all audit logs without pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/all")
    public ResponseEntity<List<AuditLogResponseDTO>> getAllNoPagination() {
        List<AuditLogResponseDTO> response = auditLogService.getAll();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit log by ID", description = "Retrieves a specific audit log entry by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Audit log found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Audit log not found")
    })
    @GetMapping("/{logId}")
    public ResponseEntity<AuditLogResponseDTO> getById(
            @Parameter(description = "Audit log ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID logId) {
        AuditLogResponseDTO response = auditLogService.getById(logId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by user", description = "Retrieves all audit logs for a specific user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AuditLogResponseDTO>> getByUserId(
            @Parameter(description = "User ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID userId) {
        List<AuditLogResponseDTO> response = auditLogService.getByUserId(userId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by entity type", description = "Retrieves all audit logs for a specific entity type (e.g., LoanApplication, User, etc.)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Entity type audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/entity-type/{entityType}")
    public ResponseEntity<List<AuditLogResponseDTO>> getByEntityType(
            @Parameter(description = "Entity type", required = true, example = "LoanApplication") @PathVariable String entityType) {
        List<AuditLogResponseDTO> response = auditLogService.getByEntityType(entityType);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by entity ID", description = "Retrieves all audit logs for a specific entity instance")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Entity audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/entity/{entityId}")
    public ResponseEntity<List<AuditLogResponseDTO>> getByEntityId(
            @Parameter(description = "Entity ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID entityId) {
        List<AuditLogResponseDTO> response = auditLogService.getByEntityId(entityId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by action", description = "Retrieves all audit logs for a specific action type (CREATE, UPDATE, DELETE)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Action audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/action/{action}")
    public ResponseEntity<List<AuditLogResponseDTO>> getByAction(
            @Parameter(description = "Action type", required = true, example = "CREATE") @PathVariable String action) {
        List<AuditLogResponseDTO> response = auditLogService.getByAction(action);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by entity type and ID", description = "Retrieves audit logs for a specific entity type and ID combination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/entity-type/{entityType}/entity/{entityId}")
    public ResponseEntity<List<AuditLogResponseDTO>> getByEntityTypeAndEntityId(
            @Parameter(description = "Entity type", required = true, example = "LoanApplication") @PathVariable String entityType,
            @Parameter(description = "Entity ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID entityId) {
        List<AuditLogResponseDTO> response = auditLogService.getByEntityTypeAndEntityId(entityType, entityId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by user and entity type", description = "Retrieves audit logs for a specific user and entity type combination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/user/{userId}/entity-type/{entityType}")
    public ResponseEntity<List<AuditLogResponseDTO>> getByUserIdAndEntityType(
            @Parameter(description = "User ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID userId,
            @Parameter(description = "Entity type", required = true, example = "LoanApplication") @PathVariable String entityType) {
        List<AuditLogResponseDTO> response = auditLogService.getByUserIdAndEntityType(userId, entityType);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by date range", description = "Retrieves audit logs within a specific date range")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Date range audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/date-range")
    public ResponseEntity<List<AuditLogResponseDTO>> getByDateRange(
            @Parameter(description = "Start date", required = true, example = "2024-01-01T00:00:00Z") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant startDate,
            @Parameter(description = "End date", required = true, example = "2024-12-31T23:59:59Z") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant endDate) {
        List<AuditLogResponseDTO> response = auditLogService.getByDateRange(startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by user and date range", description = "Retrieves audit logs for a specific user within a date range")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User date range audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<List<AuditLogResponseDTO>> getByUserIdAndDateRange(
            @Parameter(description = "User ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID userId,
            @Parameter(description = "Start date", required = true, example = "2024-01-01T00:00:00Z") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant startDate,
            @Parameter(description = "End date", required = true, example = "2024-12-31T23:59:59Z") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant endDate) {
        List<AuditLogResponseDTO> response = auditLogService.getByUserIdAndDateRange(userId, startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by IP address", description = "Retrieves all audit logs from a specific IP address")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "IP address audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/ip/{ipAddress}")
    public ResponseEntity<List<AuditLogResponseDTO>> getByIpAddress(
            @Parameter(description = "IP address", required = true, example = "192.168.1.100") @PathVariable String ipAddress) {
        List<AuditLogResponseDTO> response = auditLogService.getByIpAddress(ipAddress);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit logs by multiple actions", description = "Retrieves audit logs for multiple action types")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Multiple actions audit logs retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogResponseDTO.class)))
    })
    @GetMapping("/actions")
    public ResponseEntity<List<AuditLogResponseDTO>> getByActions(
            @Parameter(description = "List of actions", required = true, example = "CREATE,UPDATE,DELETE") @RequestParam List<String> actions) {
        List<AuditLogResponseDTO> response = auditLogService.getByActions(actions);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get audit log statistics", description = "Retrieves statistical information about audit logs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Audit log statistics retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuditLogService.AuditLogStats.class)))
    })
    @GetMapping("/statistics")
    public ResponseEntity<AuditLogService.AuditLogStats> getStatistics() {
        AuditLogService.AuditLogStats response = auditLogService.getStatistics();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete audit log", description = "Deletes an audit log entry. This should be used rarely and only by administrators.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Audit log deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Audit log not found")
    })
    @DeleteMapping("/{logId}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "Audit log ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID logId) {
        auditLogService.delete(logId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Log action manually", description = "Manually creates an audit log entry for testing purposes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Action logged successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "404", description = "Referenced user not found")
    })
    @PostMapping("/log-action")
    public ResponseEntity<String> logAction(
            @Parameter(description = "User ID performing the action", required = true) @RequestParam UUID userId,
            @Parameter(description = "Action type", required = true, example = "CREATE") @RequestParam String action,
            @Parameter(description = "Entity type", required = true, example = "LoanApplication") @RequestParam String entityType,
            @Parameter(description = "Entity ID", example = "123e4567-e89b-12d3-a456-426614174000") @RequestParam(required = false) UUID entityId,
            @Parameter(description = "Old values (JSON)", example = "{\"status\":\"DRAFT\"}") @RequestParam(required = false) String oldValues,
            @Parameter(description = "New values (JSON)", example = "{\"status\":\"SUBMITTED\"}") @RequestParam(required = false) String newValues,
            HttpServletRequest request) {

        String ipAddress = getClientIpAddress(request);

        auditLogService.logAction(userId, action, entityType, entityId, oldValues, newValues, ipAddress);
        return new ResponseEntity<>("Action logged successfully", HttpStatus.CREATED);
    }

    /**
     * Extract client IP address from HTTP request
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }

        return request.getRemoteAddr();
    }
}
