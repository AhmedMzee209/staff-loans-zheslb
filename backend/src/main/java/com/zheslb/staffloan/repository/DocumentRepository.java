package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.enums.DocumentType;
import com.zheslb.staffloan.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {

    // Find documents by application ID
    List<Document> findByApplication_ApplicationId(UUID applicationId);

    // Find documents by contract ID
    List<Document> findByContract_ContractId(UUID contractId);

    // Find documents by document type
    List<Document> findByDocumentType(DocumentType documentType);

    // Find documents by application ID and document type
    List<Document> findByApplication_ApplicationIdAndDocumentType(UUID applicationId, DocumentType documentType);

    // Find document by application ID and document type (single result)
    Optional<Document> findFirstByApplication_ApplicationIdAndDocumentType(UUID applicationId,
            DocumentType documentType);

    // Find documents by uploaded user
    List<Document> findByUploadedBy_UserId(UUID uploadedBy);

    // Find documents by contract ID and document type
    List<Document> findByContract_ContractIdAndDocumentType(UUID contractId, DocumentType documentType);

    // Check if document exists for application and type
    boolean existsByApplication_ApplicationIdAndDocumentType(UUID applicationId, DocumentType documentType);
}
