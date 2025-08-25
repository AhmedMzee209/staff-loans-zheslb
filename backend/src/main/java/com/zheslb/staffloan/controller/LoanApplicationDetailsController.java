package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.LoanApplicationDetailsRequestDTO;
import com.zheslb.staffloan.dto.response.LoanApplicationDetailsResponseDTO;
import com.zheslb.staffloan.service.LoanApplicationDetailsService;
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

import java.util.UUID;

@RestController
@RequestMapping("/api/loan-application-details")
@RequiredArgsConstructor
@Tag(name = "Loan Application Details", description = "APIs for managing loan application details")
public class LoanApplicationDetailsController {

    private final LoanApplicationDetailsService detailsService;

    @Operation(summary = "Create loan application details", description = "Creates detailed information for a specific loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Loan application details created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoanApplicationDetailsResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Loan application not found"),
            @ApiResponse(responseCode = "409", description = "Loan application details already exist")
    })
    @PostMapping("/{applicationId}")
    public ResponseEntity<LoanApplicationDetailsResponseDTO> createDetails(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId,
            @Parameter(description = "Loan application details data", required = true) @RequestBody LoanApplicationDetailsRequestDTO request) {
        LoanApplicationDetailsResponseDTO response = detailsService.createLoanApplicationDetails(applicationId,
                request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get loan application details", description = "Retrieves detailed information for a specific loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Loan application details found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoanApplicationDetailsResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Loan application or details not found")
    })
    @GetMapping("/{applicationId}")
    public ResponseEntity<LoanApplicationDetailsResponseDTO> getDetailsByApplicationId(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId) {
        return ResponseEntity.ok(detailsService.getDetailsByApplicationId(applicationId));
    }

    @Operation(summary = "Update loan application details", description = "Updates detailed information for a specific loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Loan application details updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoanApplicationDetailsResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Loan application or details not found")
    })
    @PutMapping("/{applicationId}")
    public ResponseEntity<LoanApplicationDetailsResponseDTO> updateDetails(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId,
            @Parameter(description = "Updated loan application details data", required = true) @RequestBody LoanApplicationDetailsRequestDTO request) {
        return ResponseEntity.ok(detailsService.updateLoanApplicationDetails(applicationId, request));
    }

    @Operation(summary = "Delete loan application details", description = "Deletes detailed information for a specific loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Loan application details deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Loan application or details not found")
    })
    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> deleteDetails(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId) {
        detailsService.deleteLoanApplicationDetails(applicationId);
        return ResponseEntity.noContent().build();
    }
}
