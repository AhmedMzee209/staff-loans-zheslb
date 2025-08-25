package com.zheslb.staffloan.dto.response;

import com.zheslb.staffloan.enums.DocumentType;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentResponseDTO {

    private UUID documentId;

    private UUID applicationId;

    private UUID contractId;

    private DocumentType documentType;

    private String filePath;

    private String fileName;

    private long fileSize;

    private UUID uploadedBy;

    private String uploadedByName;

    private Instant createdAt;
}
