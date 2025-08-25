package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.ApprovalStageRequestDTO;
import com.zheslb.staffloan.dto.response.ApprovalStageResponseDTO;
import com.zheslb.staffloan.enums.StageType;
import com.zheslb.staffloan.service.ApprovalStageService;
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
@RequestMapping("/api/approval-stages")
@RequiredArgsConstructor
@Tag(name = "Approval Stages", description = "APIs for managing loan application approval workflow stages")
public class ApprovalStageController {

    private final ApprovalStageService approvalStageService;

    @Operation(summary = "Create approval stage", description = "Creates a new approval stage for a loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Approval stage created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Loan application not found")
    })
    @PostMapping
    public ResponseEntity<ApprovalStageResponseDTO> create(
            @Parameter(description = "Approval stage data", required = true) @RequestBody ApprovalStageRequestDTO request) {
        ApprovalStageResponseDTO response = approvalStageService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all approval stages", description = "Retrieves a list of all approval stages")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Approval stages retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<ApprovalStageResponseDTO>> getAll() {
        return ResponseEntity.ok(approvalStageService.getAll());
    }

    @Operation(summary = "Get approval stage by ID", description = "Retrieves a specific approval stage by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Approval stage found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Approval stage not found")
    })
    @GetMapping("/{stageId}")
    public ResponseEntity<ApprovalStageResponseDTO> getById(
            @Parameter(description = "Approval stage ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID stageId) {
        return ResponseEntity.ok(approvalStageService.getById(stageId));
    }

    @Operation(summary = "Get approval stages by application ID", description = "Retrieves all approval stages for a specific loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Approval stages found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class)))
    })
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<ApprovalStageResponseDTO>> getByApplicationId(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId) {
        return ResponseEntity.ok(approvalStageService.getByApplicationId(applicationId));
    }

    @Operation(summary = "Get approval stages by application and stage type", description = "Retrieves approval stages for a specific loan application and stage type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Approval stages found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class)))
    })
    @GetMapping("/application/{applicationId}/type/{stageType}")
    public ResponseEntity<List<ApprovalStageResponseDTO>> getByApplicationIdAndStageType(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId,
            @Parameter(description = "Stage type", required = true, example = "HOD") @PathVariable StageType stageType) {
        return ResponseEntity.ok(approvalStageService.getByApplicationIdAndStageType(applicationId, stageType));
    }

    @Operation(summary = "Get pending approval stages", description = "Retrieves all approval stages with pending status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pending approval stages found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class)))
    })
    @GetMapping("/pending")
    public ResponseEntity<List<ApprovalStageResponseDTO>> getPendingStages() {
        return ResponseEntity.ok(approvalStageService.getPendingStages());
    }

    @Operation(summary = "Create all stages for application", description = "Creates all required approval stages (HOD, ACCOUNTANT, CEO, LEGAL) for a loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "All approval stages created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Loan application not found")
    })
    @PostMapping("/application/{applicationId}/create-all")
    public ResponseEntity<List<ApprovalStageResponseDTO>> createStagesForApplication(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId) {
        List<ApprovalStageResponseDTO> stages = approvalStageService.createStagesForApplication(applicationId);
        return new ResponseEntity<>(stages, HttpStatus.CREATED);
    }

    @Operation(summary = "Update approval stage", description = "Updates an existing approval stage")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Approval stage updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Approval stage not found")
    })
    @PutMapping("/{stageId}")
    public ResponseEntity<ApprovalStageResponseDTO> update(
            @Parameter(description = "Approval stage ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID stageId,
            @Parameter(description = "Updated approval stage data", required = true) @RequestBody ApprovalStageRequestDTO request) {
        return ResponseEntity.ok(approvalStageService.update(stageId, request));
    }

    @Operation(summary = "Approve stage", description = "Approves an approval stage with optional comments")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Stage approved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Approval stage not found")
    })
    @PostMapping("/{stageId}/approve")
    public ResponseEntity<ApprovalStageResponseDTO> approve(
            @Parameter(description = "Approval stage ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID stageId,
            @Parameter(description = "Approval comments", required = false) @RequestParam(required = false) String comments) {
        return ResponseEntity.ok(approvalStageService.approve(stageId, comments));
    }

    @Operation(summary = "Reject stage", description = "Rejects an approval stage with optional comments")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Stage rejected successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Approval stage not found")
    })
    @PostMapping("/{stageId}/reject")
    public ResponseEntity<ApprovalStageResponseDTO> reject(
            @Parameter(description = "Approval stage ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID stageId,
            @Parameter(description = "Rejection comments", required = false) @RequestParam(required = false) String comments) {
        return ResponseEntity.ok(approvalStageService.reject(stageId, comments));
    }

    @Operation(summary = "Return stage for revision", description = "Returns an approval stage for revision with optional comments")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Stage returned for revision successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApprovalStageResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Approval stage not found")
    })
    @PostMapping("/{stageId}/return")
    public ResponseEntity<ApprovalStageResponseDTO> returnForRevision(
            @Parameter(description = "Approval stage ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID stageId,
            @Parameter(description = "Return comments", required = false) @RequestParam(required = false) String comments) {
        return ResponseEntity.ok(approvalStageService.returnForRevision(stageId, comments));
    }

    @Operation(summary = "Delete approval stage", description = "Deletes an approval stage")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Approval stage deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Approval stage not found")
    })
    @DeleteMapping("/{stageId}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "Approval stage ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID stageId) {
        approvalStageService.delete(stageId);
        return ResponseEntity.noContent().build();
    }
}
