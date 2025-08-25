package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.StaffApprovalRequestDTO;
import com.zheslb.staffloan.dto.response.StaffApprovalResponseDTO;
import com.zheslb.staffloan.service.StaffApprovalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/staff-approvals")
@RequiredArgsConstructor
@Tag(name = "Staff Approvals", description = "APIs for managing staff approval hierarchy and permissions")
public class StaffApprovalController {

    private final StaffApprovalService staffApprovalService;

    @Operation(summary = "Create staff approval", description = "Creates a new staff approval record with hierarchy and priority level")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Staff approval created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffApprovalResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Staff profile not found")
    })
    @PostMapping
    public ResponseEntity<StaffApprovalResponseDTO> create(
            @Parameter(description = "Staff approval data", required = true) @RequestBody StaffApprovalRequestDTO request) {
        StaffApprovalResponseDTO response = staffApprovalService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all staff approvals", description = "Retrieves a list of all staff approval records")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Staff approvals retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffApprovalResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<StaffApprovalResponseDTO>> getAll() {
        return ResponseEntity.ok(staffApprovalService.getAll());
    }

    @Operation(summary = "Get staff approval by ID", description = "Retrieves a specific staff approval record by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Staff approval found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffApprovalResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Staff approval not found")
    })
    @GetMapping("/{approvalId}")
    public ResponseEntity<StaffApprovalResponseDTO> getById(
            @Parameter(description = "Staff approval ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID approvalId) {
        return ResponseEntity.ok(staffApprovalService.getById(approvalId));
    }

    @Operation(summary = "Get staff approvals by staff ID", description = "Retrieves all approval records for a specific staff member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Staff approvals found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffApprovalResponseDTO.class)))
    })
    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<StaffApprovalResponseDTO>> getByStaffId(
            @Parameter(description = "Staff ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID staffId) {
        return ResponseEntity.ok(staffApprovalService.getByStaffId(staffId));
    }

    @Operation(summary = "Get staff approval by staff ID and priority level", description = "Retrieves a specific approval record for a staff member at a given priority level")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Staff approval found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffApprovalResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Staff approval not found")
    })
    @GetMapping("/staff/{staffId}/priority/{priorityLevel}")
    public ResponseEntity<StaffApprovalResponseDTO> getByStaffIdAndPriorityLevel(
            @Parameter(description = "Staff ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID staffId,
            @Parameter(description = "Priority level", required = true, example = "1") @PathVariable int priorityLevel) {
        return ResponseEntity.ok(staffApprovalService.getByStaffIdAndPriorityLevel(staffId, priorityLevel));
    }

    @Operation(summary = "Update staff approval", description = "Updates an existing staff approval record")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Staff approval updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffApprovalResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Staff approval not found")
    })
    @PutMapping("/{approvalId}")
    public ResponseEntity<StaffApprovalResponseDTO> update(
            @Parameter(description = "Staff approval ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID approvalId,
            @Parameter(description = "Updated staff approval data", required = true) @RequestBody StaffApprovalRequestDTO request) {
        return ResponseEntity.ok(staffApprovalService.update(approvalId, request));
    }

    @Operation(summary = "HOD approval action", description = "Records HOD approval for a staff approval request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "HOD approval recorded successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffApprovalResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Staff approval not found")
    })
    @PostMapping("/{approvalId}/hod-approve")
    public ResponseEntity<StaffApprovalResponseDTO> approveByHod(
            @Parameter(description = "Staff approval ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID approvalId,
            @Parameter(description = "HOD comments", required = false) @RequestParam(required = false) String comments) {
        return ResponseEntity.ok(staffApprovalService.approveByHod(approvalId, comments));
    }

    @Operation(summary = "CEO approval action", description = "Records CEO approval for a staff approval request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "CEO approval recorded successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffApprovalResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Staff approval not found")
    })
    @PostMapping("/{approvalId}/ceo-approve")
    public ResponseEntity<StaffApprovalResponseDTO> approveByCeo(
            @Parameter(description = "Staff approval ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID approvalId,
            @Parameter(description = "CEO comments", required = false) @RequestParam(required = false) String comments) {
        return ResponseEntity.ok(staffApprovalService.approveByCeo(approvalId, comments));
    }

    @Operation(summary = "Delete staff approval", description = "Deletes a staff approval record")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Staff approval deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Staff approval not found")
    })
    @DeleteMapping("/{approvalId}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "Staff approval ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID approvalId) {
        staffApprovalService.delete(approvalId);
        return ResponseEntity.noContent().build();
    }
}
