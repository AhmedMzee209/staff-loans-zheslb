package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.DocumentRequestDTO;
import com.zheslb.staffloan.dto.response.DocumentResponseDTO;
import com.zheslb.staffloan.enums.DocumentType;
import com.zheslb.staffloan.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "APIs for managing document uploads and downloads")
public class DocumentController {

    private final DocumentService documentService;

    @Operation(summary = "Upload document", description = "Uploads a document file with metadata. Supports various document types like ZANZIBAR_ID, PAYSLIP, ZSSF_CARD, etc.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Document uploaded successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid file or request data"),
            @ApiResponse(responseCode = "404", description = "Referenced application or contract not found"),
            @ApiResponse(responseCode = "500", description = "File upload failed")
    })
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DocumentResponseDTO> uploadDocument(
            @Parameter(description = "Document file to upload", required = true) @RequestParam("file") MultipartFile file,
            @Parameter(description = "Application ID (optional)", example = "123e4567-e89b-12d3-a456-426614174000") @RequestParam(required = false) UUID applicationId,
            @Parameter(description = "Contract ID (optional)", example = "123e4567-e89b-12d3-a456-426614174000") @RequestParam(required = false) UUID contractId,
            @Parameter(description = "Document type", required = true, example = "ZANZIBAR_ID") @RequestParam DocumentType documentType,
            @Parameter(description = "User who is uploading", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @RequestParam UUID uploadedBy)
            throws IOException {

        DocumentRequestDTO requestDTO = DocumentRequestDTO.builder()
                .applicationId(applicationId)
                .contractId(contractId)
                .documentType(documentType)
                .uploadedBy(uploadedBy)
                .build();

        DocumentResponseDTO response = documentService.uploadDocument(file, requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Create document metadata", description = "Creates document metadata without file upload (for external file references)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Document metadata created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Referenced application or contract not found")
    })
    @PostMapping
    public ResponseEntity<DocumentResponseDTO> create(
            @Parameter(description = "Document metadata", required = true) @RequestBody DocumentRequestDTO request) {
        DocumentResponseDTO response = documentService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all documents", description = "Retrieves a list of all document metadata")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Documents retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<DocumentResponseDTO>> getAll() {
        return ResponseEntity.ok(documentService.getAll());
    }

    @Operation(summary = "Get document by ID", description = "Retrieves document metadata by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Document not found")
    })
    @GetMapping("/{documentId}")
    public ResponseEntity<DocumentResponseDTO> getById(
            @Parameter(description = "Document ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID documentId) {
        return ResponseEntity.ok(documentService.getById(documentId));
    }

    @Operation(summary = "Get documents by application ID", description = "Retrieves all documents associated with a specific loan application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Documents found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class)))
    })
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<DocumentResponseDTO>> getByApplicationId(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId) {
        return ResponseEntity.ok(documentService.getByApplicationId(applicationId));
    }

    @Operation(summary = "Get documents by contract ID", description = "Retrieves all documents associated with a specific contract")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Documents found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class)))
    })
    @GetMapping("/contract/{contractId}")
    public ResponseEntity<List<DocumentResponseDTO>> getByContractId(
            @Parameter(description = "Contract ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID contractId) {
        return ResponseEntity.ok(documentService.getByContractId(contractId));
    }

    @Operation(summary = "Get documents by type", description = "Retrieves all documents of a specific type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Documents found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class)))
    })
    @GetMapping("/type/{documentType}")
    public ResponseEntity<List<DocumentResponseDTO>> getByDocumentType(
            @Parameter(description = "Document type", required = true, example = "ZANZIBAR_ID") @PathVariable DocumentType documentType) {
        return ResponseEntity.ok(documentService.getByDocumentType(documentType));
    }

    @Operation(summary = "Get documents by application and type", description = "Retrieves documents for a specific application and document type")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Documents found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class)))
    })
    @GetMapping("/application/{applicationId}/type/{documentType}")
    public ResponseEntity<List<DocumentResponseDTO>> getByApplicationIdAndDocumentType(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId,
            @Parameter(description = "Document type", required = true, example = "ZANZIBAR_ID") @PathVariable DocumentType documentType) {
        return ResponseEntity.ok(documentService.getByApplicationIdAndDocumentType(applicationId, documentType));
    }

    @Operation(summary = "Get documents by uploader", description = "Retrieves all documents uploaded by a specific user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Documents found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class)))
    })
    @GetMapping("/uploader/{uploadedBy}")
    public ResponseEntity<List<DocumentResponseDTO>> getByUploadedBy(
            @Parameter(description = "User ID who uploaded the documents", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID uploadedBy) {
        return ResponseEntity.ok(documentService.getByUploadedBy(uploadedBy));
    }

    @Operation(summary = "Download document", description = "Downloads the actual document file")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document downloaded successfully"),
            @ApiResponse(responseCode = "404", description = "Document or file not found"),
            @ApiResponse(responseCode = "500", description = "File download failed")
    })
    @GetMapping("/{documentId}/download")
    public ResponseEntity<Resource> downloadDocument(
            @Parameter(description = "Document ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID documentId)
            throws MalformedURLException {

        Resource resource = documentService.downloadDocument(documentId);
        DocumentResponseDTO document = documentService.getById(documentId);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + document.getFileName() + "\"")
                .body(resource);
    }

    @Operation(summary = "Replace document", description = "Replaces an existing document with a new file")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document replaced successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DocumentResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid file"),
            @ApiResponse(responseCode = "404", description = "Document not found"),
            @ApiResponse(responseCode = "500", description = "File replacement failed")
    })
    @PutMapping(value = "/{documentId}/replace", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DocumentResponseDTO> replaceDocument(
            @Parameter(description = "Document ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID documentId,
            @Parameter(description = "New document file", required = true) @RequestParam("file") MultipartFile newFile)
            throws IOException {

        DocumentResponseDTO response = documentService.replaceDocument(documentId, newFile);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Check document exists", description = "Checks if a document of specific type exists for an application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Check completed successfully")
    })
    @GetMapping("/exists/application/{applicationId}/type/{documentType}")
    public ResponseEntity<Boolean> documentExists(
            @Parameter(description = "Loan application ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID applicationId,
            @Parameter(description = "Document type", required = true, example = "ZANZIBAR_ID") @PathVariable DocumentType documentType) {

        boolean exists = documentService.documentExists(applicationId, documentType);
        return ResponseEntity.ok(exists);
    }

    @Operation(summary = "Delete document", description = "Deletes a document and its associated file")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Document deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Document not found"),
            @ApiResponse(responseCode = "500", description = "File deletion failed")
    })
    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "Document ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID documentId)
            throws IOException {

        documentService.delete(documentId);
        return ResponseEntity.noContent().build();
    }
}
