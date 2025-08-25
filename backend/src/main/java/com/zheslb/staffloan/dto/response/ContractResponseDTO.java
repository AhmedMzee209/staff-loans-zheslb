package com.zheslb.staffloan.dto.response;

import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractResponseDTO {

    private UUID contractId;

    private UUID applicationId;

    private UUID legalOfficerId;

    private String legalOfficerName;

    private String documentPath;

    private Boolean ceoApproved;

    private Boolean staffSigned;

    private Integer downloadCount;

    private Instant createdAt;

    private Instant updatedAt;

    private List<ContractVersionResponseDTO> versions;
}
