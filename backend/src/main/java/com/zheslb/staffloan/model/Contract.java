package com.zheslb.staffloan.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract {

    @Id
    @GeneratedValue
    @Column(name = "contract_id")
    private UUID contractId;

    @OneToOne
    @JoinColumn(name = "application_id", nullable = false, unique = true)
    private LoanApplication application;

    @ManyToOne
    @JoinColumn(name = "legal_officer_id")
    private User legalOfficer;

    @Column(name = "document_path", nullable = false, length = 512)
    private String documentPath;

    @Builder.Default
    @Column(name = "ceo_approved")
    private Boolean ceoApproved = false;

    @Builder.Default
    @Column(name = "staff_signed")
    private Boolean staffSigned = false;

    @Builder.Default
    @Column(name = "download_count")
    private Integer downloadCount = 0;

    @Builder.Default
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Builder.Default
    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    @OneToMany(mappedBy = "contract", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ContractVersion> versions;
}
