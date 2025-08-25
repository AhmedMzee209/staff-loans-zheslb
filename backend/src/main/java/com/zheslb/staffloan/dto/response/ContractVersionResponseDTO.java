package com.zheslb.staffloan.dto.response;

import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractVersionResponseDTO {

    private UUID versionId;

    private UUID contractId;

    private String documentPath;

    private Integer versionNumber;

    private String changeReason;

    private UUID createdBy;

    private String createdByName;

    private Instant createdAt;
}
