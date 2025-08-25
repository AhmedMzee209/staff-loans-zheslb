package com.zheslb.staffloan.dto.request;

import com.zheslb.staffloan.enums.DocumentType;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentRequestDTO {

    private UUID applicationId;

    private UUID contractId;

    private DocumentType documentType;

    private String filePath;

    private UUID uploadedBy;
}
