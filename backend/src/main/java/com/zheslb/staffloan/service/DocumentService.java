package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.request.DocumentRequestDTO;
import com.zheslb.staffloan.dto.response.DocumentResponseDTO;
import com.zheslb.staffloan.enums.DocumentType;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.model.Contract;
import com.zheslb.staffloan.model.Document;
import com.zheslb.staffloan.model.LoanApplication;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.ContractRepository;
import com.zheslb.staffloan.repository.DocumentRepository;
import com.zheslb.staffloan.repository.LoanApplicationRepository;
import com.zheslb.staffloan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final ContractRepository contractRepository;
    private final UserRepository userRepository;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public DocumentResponseDTO uploadDocument(MultipartFile file, DocumentRequestDTO requestDTO) throws IOException {
        // Validate file
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        // Validate entities exist
        LoanApplication application = null;
        Contract contract = null;

        if (requestDTO.getApplicationId() != null) {
            application = loanApplicationRepository.findById(requestDTO.getApplicationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));
        }

        if (requestDTO.getContractId() != null) {
            contract = contractRepository.findById(requestDTO.getContractId())
                    .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
        }

        User uploader = userRepository.findById(requestDTO.getUploadedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = "";
        if (originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        // Create subdirectory based on document type
        Path typeDir = uploadPath.resolve(requestDTO.getDocumentType().toString().toLowerCase());
        if (!Files.exists(typeDir)) {
            Files.createDirectories(typeDir);
        }

        // Save file
        Path filePath = typeDir.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Create document entity
        Document document = Document.builder()
                .application(application)
                .contract(contract)
                .documentType(requestDTO.getDocumentType())
                .filePath(filePath.toString())
                .uploadedBy(uploader)
                .createdAt(Instant.now())
                .build();

        Document savedDocument = documentRepository.save(document);
        log.info("Document uploaded successfully: {} for type: {}", uniqueFilename, requestDTO.getDocumentType());

        return mapToResponseDTO(savedDocument, originalFilename, file.getSize());
    }

    public DocumentResponseDTO create(DocumentRequestDTO requestDTO) {
        LoanApplication application = null;
        Contract contract = null;

        if (requestDTO.getApplicationId() != null) {
            application = loanApplicationRepository.findById(requestDTO.getApplicationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));
        }

        if (requestDTO.getContractId() != null) {
            contract = contractRepository.findById(requestDTO.getContractId())
                    .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));
        }

        User uploader = userRepository.findById(requestDTO.getUploadedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Document document = mapToEntity(requestDTO);
        document.setApplication(application);
        document.setContract(contract);
        document.setUploadedBy(uploader);
        document.setCreatedAt(Instant.now());

        Document savedDocument = documentRepository.save(document);
        return mapToResponseDTO(savedDocument, null, 0);
    }

    public List<DocumentResponseDTO> getAll() {
        return documentRepository.findAll()
                .stream()
                .map(doc -> mapToResponseDTO(doc, null, 0))
                .collect(Collectors.toList());
    }

    public DocumentResponseDTO getById(UUID documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));

        return mapToResponseDTO(document, null, 0);
    }

    public List<DocumentResponseDTO> getByApplicationId(UUID applicationId) {
        return documentRepository.findByApplication_ApplicationId(applicationId)
                .stream()
                .map(doc -> mapToResponseDTO(doc, null, 0))
                .collect(Collectors.toList());
    }

    public List<DocumentResponseDTO> getByContractId(UUID contractId) {
        return documentRepository.findByContract_ContractId(contractId)
                .stream()
                .map(doc -> mapToResponseDTO(doc, null, 0))
                .collect(Collectors.toList());
    }

    public List<DocumentResponseDTO> getByDocumentType(DocumentType documentType) {
        return documentRepository.findByDocumentType(documentType)
                .stream()
                .map(doc -> mapToResponseDTO(doc, null, 0))
                .collect(Collectors.toList());
    }

    public List<DocumentResponseDTO> getByApplicationIdAndDocumentType(UUID applicationId, DocumentType documentType) {
        return documentRepository.findByApplication_ApplicationIdAndDocumentType(applicationId, documentType)
                .stream()
                .map(doc -> mapToResponseDTO(doc, null, 0))
                .collect(Collectors.toList());
    }

    public List<DocumentResponseDTO> getByUploadedBy(UUID uploadedBy) {
        return documentRepository.findByUploadedBy_UserId(uploadedBy)
                .stream()
                .map(doc -> mapToResponseDTO(doc, null, 0))
                .collect(Collectors.toList());
    }

    public Resource downloadDocument(UUID documentId) throws MalformedURLException {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));

        Path filePath = Paths.get(document.getFilePath());
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new ResourceNotFoundException("File not found or not readable: " + document.getFilePath());
        }
    }

    public void delete(UUID documentId) throws IOException {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));

        // Delete physical file
        Path filePath = Paths.get(document.getFilePath());
        if (Files.exists(filePath)) {
            Files.delete(filePath);
            log.info("Physical file deleted: {}", document.getFilePath());
        }

        // Delete database record
        documentRepository.deleteById(documentId);
        log.info("Document record deleted: {}", documentId);
    }

    public boolean documentExists(UUID applicationId, DocumentType documentType) {
        return documentRepository.existsByApplication_ApplicationIdAndDocumentType(applicationId, documentType);
    }

    public DocumentResponseDTO replaceDocument(UUID documentId, MultipartFile newFile) throws IOException {
        Document existingDocument = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));

        // Delete old file
        Path oldFilePath = Paths.get(existingDocument.getFilePath());
        if (Files.exists(oldFilePath)) {
            Files.delete(oldFilePath);
        }

        // Save new file
        String originalFilename = StringUtils.cleanPath(newFile.getOriginalFilename());
        String fileExtension = "";
        if (originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

        Path uploadPath = Paths.get(uploadDir);
        Path typeDir = uploadPath.resolve(existingDocument.getDocumentType().toString().toLowerCase());
        if (!Files.exists(typeDir)) {
            Files.createDirectories(typeDir);
        }

        Path newFilePath = typeDir.resolve(uniqueFilename);
        Files.copy(newFile.getInputStream(), newFilePath, StandardCopyOption.REPLACE_EXISTING);

        // Update document record
        existingDocument.setFilePath(newFilePath.toString());
        Document updatedDocument = documentRepository.save(existingDocument);

        log.info("Document replaced successfully: {} -> {}", oldFilePath, newFilePath);
        return mapToResponseDTO(updatedDocument, originalFilename, newFile.getSize());
    }

    private Document mapToEntity(DocumentRequestDTO requestDTO) {
        return Document.builder()
                .documentType(requestDTO.getDocumentType())
                .filePath(requestDTO.getFilePath())
                .build();
    }

    private DocumentResponseDTO mapToResponseDTO(Document document, String originalFileName, long fileSize) {
        String fileName = originalFileName;
        if (fileName == null && document.getFilePath() != null) {
            Path path = Paths.get(document.getFilePath());
            fileName = path.getFileName().toString();
        }

        return DocumentResponseDTO.builder()
                .documentId(document.getDocumentId())
                .applicationId(document.getApplication() != null ? document.getApplication().getApplicationId() : null)
                .contractId(document.getContract() != null ? document.getContract().getContractId() : null)
                .documentType(document.getDocumentType())
                .filePath(document.getFilePath())
                .fileName(fileName)
                .fileSize(fileSize)
                .uploadedBy(document.getUploadedBy() != null ? document.getUploadedBy().getUserId() : null)
                .uploadedByName(document.getUploadedBy() != null ? document.getUploadedBy().getEmail() : null)
                .createdAt(document.getCreatedAt())
                .build();
    }
}
