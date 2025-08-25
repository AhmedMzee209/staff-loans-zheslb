package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContractRepository extends JpaRepository<Contract, UUID> {

    // Find contract by application ID
    Optional<Contract> findByApplication_ApplicationId(UUID applicationId);

    // Find contracts by legal officer
    List<Contract> findByLegalOfficer_UserId(UUID legalOfficerId);

    // Find contracts requiring CEO approval
    List<Contract> findByCeoApprovedFalse();

    // Find contracts requiring staff signature
    List<Contract> findByStaffSignedFalse();

    // Find fully processed contracts (CEO approved and staff signed)
    List<Contract> findByCeoApprovedTrueAndStaffSignedTrue();

    // Find contracts with high download count
    @Query("SELECT c FROM Contract c WHERE c.downloadCount >= :minDownloads")
    List<Contract> findByDownloadCountGreaterThanEqual(@Param("minDownloads") Integer minDownloads);
}
