package com.zheslb.staffloan.dto.request;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractVersionRequestDTO {

    private UUID contractId;

    private String documentPath;

    private Integer versionNumber;

    private String changeReason;

    private UUID createdBy;
}
