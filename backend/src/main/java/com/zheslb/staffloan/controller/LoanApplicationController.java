package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.LoanApplicationRequestDTO;
import com.zheslb.staffloan.dto.response.LoanApplicationResponseDTO;
import com.zheslb.staffloan.service.LoanApplicationService;
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
@RequestMapping("/api/loan-applications")
@RequiredArgsConstructor
@Tag(name = "Loan Applications", description = "APIs for managing loan applications")
public class LoanApplicationController {

    private final LoanApplicationService loanApplicationService;

    @Operation(summary = "Create a new loan application", description = "Creates a new loan application with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Loan application created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoanApplicationResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    @PostMapping
    public ResponseEntity<LoanApplicationResponseDTO> createLoanApplication(
            @Parameter(description = "Loan application data", required = true) @RequestBody LoanApplicationRequestDTO request) {
        LoanApplicationResponseDTO response = loanApplicationService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get loan application by ID", description = "Retrieves a specific loan application by its unique identifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Loan application found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoanApplicationResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Loan application not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<LoanApplicationResponseDTO> getById(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id) {
        return ResponseEntity.ok(loanApplicationService.getById(id));
    }

    @Operation(summary = "Get all loan applications", description = "Retrieves a list of all loan applications in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Loan applications retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoanApplicationResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<LoanApplicationResponseDTO>> getAll() {
        return ResponseEntity.ok(loanApplicationService.getAll());
    }

    @Operation(summary = "Update loan application", description = "Updates an existing loan application with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Loan application updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoanApplicationResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Loan application not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<LoanApplicationResponseDTO> updateLoanApplication(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id,
            @Parameter(description = "Updated loan application data", required = true) @RequestBody LoanApplicationRequestDTO request) {
        return ResponseEntity.ok(loanApplicationService.update(id, request));
    }

    @Operation(summary = "Delete loan application", description = "Deletes a loan application from the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Loan application deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Loan application not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoanApplication(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id) {
        loanApplicationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
