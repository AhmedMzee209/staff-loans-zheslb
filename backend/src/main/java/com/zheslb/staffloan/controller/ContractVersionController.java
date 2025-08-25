package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.ContractVersionRequestDTO;
import com.zheslb.staffloan.dto.response.ContractVersionResponseDTO;
import com.zheslb.staffloan.service.ContractVersionService;
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
@RequestMapping("/api/contract-versions")
@RequiredArgsConstructor
@Tag(name = "Contract Version Management", description = "APIs for managing contract versions and audit trail")
public class ContractVersionController {

    private final ContractVersionService contractVersionService;

    @Operation(summary = "Create a new contract version", description = "Creates a new version of an existing contract with audit trail")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Contract version created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractVersionResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Contract or user not found")
    })
    @PostMapping
    public ResponseEntity<ContractVersionResponseDTO> createContractVersion(
            @Parameter(description = "Contract version details", required = true) @RequestBody ContractVersionRequestDTO request) {
        ContractVersionResponseDTO response = contractVersionService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Update contract version", description = "Updates an existing contract version's information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract version updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractVersionResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Contract version not found")
    })
    @PutMapping("/{versionId}")
    public ResponseEntity<ContractVersionResponseDTO> updateContractVersion(
            @Parameter(description = "Version ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID versionId,
            @Parameter(description = "Updated contract version details", required = true) @RequestBody ContractVersionRequestDTO request) {
        return ResponseEntity.ok(contractVersionService.update(versionId, request));
    }

    @Operation(summary = "Get all contract versions", description = "Retrieves a list of all contract versions in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract versions retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractVersionResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<ContractVersionResponseDTO>> getAllContractVersions() {
        return ResponseEntity.ok(contractVersionService.getAll());
    }

    @Operation(summary = "Get contract version by ID", description = "Retrieves a specific contract version by its unique identifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract version found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractVersionResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Contract version not found")
    })
    @GetMapping("/{versionId}")
    public ResponseEntity<ContractVersionResponseDTO> getContractVersionById(
            @Parameter(description = "Version ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID versionId) {
        return ResponseEntity.ok(contractVersionService.getById(versionId));
    }

    @Operation(summary = "Get versions by contract ID", description = "Retrieves all versions for a specific contract, ordered by version number (latest first)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract versions retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractVersionResponseDTO.class)))
    })
    @GetMapping("/contract/{contractId}")
    public ResponseEntity<List<ContractVersionResponseDTO>> getVersionsByContractId(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId) {
        return ResponseEntity.ok(contractVersionService.getByContractId(contractId));
    }

    @Operation(summary = "Get latest contract version", description = "Retrieves the most recent version of a specific contract")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Latest version found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractVersionResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "No versions found for this contract")
    })
    @GetMapping("/contract/{contractId}/latest")
    public ResponseEntity<ContractVersionResponseDTO> getLatestVersion(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId) {
        return ResponseEntity.ok(contractVersionService.getLatestVersion(contractId));
    }

    @Operation(summary = "Get versions by creator", description = "Retrieves all contract versions created by a specific user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract versions retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractVersionResponseDTO.class)))
    })
    @GetMapping("/creator/{userId}")
    public ResponseEntity<List<ContractVersionResponseDTO>> getVersionsByCreator(
            @Parameter(description = "User ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID userId) {
        return ResponseEntity.ok(contractVersionService.getByCreatedBy(userId));
    }

    @Operation(summary = "Create new version with reason", description = "Creates a new version of a contract with a specific change reason")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "New version created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractVersionResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Contract or user not found")
    })
    @PostMapping("/contract/{contractId}/new-version")
    public ResponseEntity<ContractVersionResponseDTO> createNewVersion(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId,
            @Parameter(description = "Document path", required = true) @RequestParam String documentPath,
            @Parameter(description = "Reason for creating new version", required = true) @RequestParam String changeReason,
            @Parameter(description = "User creating the version", required = true) @RequestParam UUID createdBy) {
        ContractVersionResponseDTO response = contractVersionService.createNewVersion(contractId, documentPath,
                changeReason, createdBy);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Delete contract version", description = "Deletes a specific contract version from the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Contract version deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Contract version not found")
    })
    @DeleteMapping("/{versionId}")
    public ResponseEntity<Void> deleteContractVersion(
            @Parameter(description = "Version ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID versionId) {
        contractVersionService.delete(versionId);
        return ResponseEntity.noContent().build();
    }
}
