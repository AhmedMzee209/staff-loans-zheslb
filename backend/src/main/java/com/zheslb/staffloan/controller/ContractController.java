package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.ContractRequestDTO;
import com.zheslb.staffloan.dto.response.ContractResponseDTO;
import com.zheslb.staffloan.service.ContractService;
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
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
@Tag(name = "Contract Management", description = "APIs for managing loan contracts and digital signatures")
public class ContractController {

    private final ContractService contractService;

    @Operation(summary = "Create a new contract", description = "Creates a new contract for a loan application with legal officer assignment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Contract created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data or contract already exists"),
            @ApiResponse(responseCode = "404", description = "Loan application or legal officer not found")
    })
    @PostMapping
    public ResponseEntity<ContractResponseDTO> createContract(
            @Parameter(description = "Contract details", required = true) @RequestBody ContractRequestDTO request) {
        ContractResponseDTO response = contractService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Update contract details", description = "Updates an existing contract's information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @PutMapping("/{contractId}")
    public ResponseEntity<ContractResponseDTO> updateContract(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId,
            @Parameter(description = "Updated contract details", required = true) @RequestBody ContractRequestDTO request) {
        return ResponseEntity.ok(contractService.update(contractId, request));
    }

    @Operation(summary = "Get all contracts", description = "Retrieves a list of all contracts in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contracts retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<ContractResponseDTO>> getAllContracts() {
        return ResponseEntity.ok(contractService.getAll());
    }

    @Operation(summary = "Get contract by ID", description = "Retrieves a specific contract by its unique identifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @GetMapping("/{contractId}")
    public ResponseEntity<ContractResponseDTO> getContractById(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId) {
        return ResponseEntity.ok(contractService.getById(contractId));
    }

    @Operation(summary = "Get contract by application ID", description = "Retrieves the contract associated with a specific loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Contract not found for this application")
    })
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<ContractResponseDTO> getContractByApplicationId(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId) {
        return ResponseEntity.ok(contractService.getByApplicationId(applicationId));
    }

    @Operation(summary = "Get contracts by legal officer", description = "Retrieves all contracts assigned to a specific legal officer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contracts retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class)))
    })
    @GetMapping("/legal-officer/{legalOfficerId}")
    public ResponseEntity<List<ContractResponseDTO>> getContractsByLegalOfficer(
            @Parameter(description = "Legal officer user ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID legalOfficerId) {
        return ResponseEntity.ok(contractService.getByLegalOfficer(legalOfficerId));
    }

    @Operation(summary = "Get contracts pending CEO approval", description = "Retrieves all contracts that are waiting for CEO approval")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pending contracts retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class)))
    })
    @GetMapping("/pending-ceo-approval")
    public ResponseEntity<List<ContractResponseDTO>> getPendingCeoApproval() {
        return ResponseEntity.ok(contractService.getPendingCeoApproval());
    }

    @Operation(summary = "Get contracts pending staff signature", description = "Retrieves all contracts that are waiting for staff signature")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pending contracts retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class)))
    })
    @GetMapping("/pending-staff-signature")
    public ResponseEntity<List<ContractResponseDTO>> getPendingStaffSignature() {
        return ResponseEntity.ok(contractService.getPendingStaffSignature());
    }

    @Operation(summary = "Get completed contracts", description = "Retrieves all contracts that have been approved by CEO and signed by staff")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Completed contracts retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class)))
    })
    @GetMapping("/completed")
    public ResponseEntity<List<ContractResponseDTO>> getCompletedContracts() {
        return ResponseEntity.ok(contractService.getCompletedContracts());
    }

    @Operation(summary = "CEO approve contract", description = "Marks a contract as approved by the CEO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract approved by CEO successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @PatchMapping("/{contractId}/ceo-approve")
    public ResponseEntity<ContractResponseDTO> approveByCeo(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId) {
        return ResponseEntity.ok(contractService.approveByCeo(contractId));
    }

    @Operation(summary = "Staff sign contract", description = "Marks a contract as signed by the staff member")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract signed by staff successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Contract must be approved by CEO first"),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @PatchMapping("/{contractId}/staff-sign")
    public ResponseEntity<ContractResponseDTO> signByStaff(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId) {
        return ResponseEntity.ok(contractService.signByStaff(contractId));
    }

    @Operation(summary = "Increment download count", description = "Increments the download count for a contract when it's downloaded")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Download count incremented successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ContractResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @PatchMapping("/{contractId}/download")
    public ResponseEntity<ContractResponseDTO> incrementDownloadCount(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId) {
        return ResponseEntity.ok(contractService.incrementDownloadCount(contractId));
    }

    @Operation(summary = "Delete contract", description = "Deletes a contract from the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Contract deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @DeleteMapping("/{contractId}")
    public ResponseEntity<Void> deleteContract(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId) {
        contractService.delete(contractId);
        return ResponseEntity.noContent().build();
    }
}
