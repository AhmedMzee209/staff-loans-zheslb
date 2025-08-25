package com.zheslb.staffloan.dto.request;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractRequestDTO {

    private UUID applicationId;

    private UUID legalOfficerId;

    private String documentPath;

    private Boolean ceoApproved;

    private Boolean staffSigned;
}
