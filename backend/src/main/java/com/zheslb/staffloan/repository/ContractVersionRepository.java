package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.ContractVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContractVersionRepository extends JpaRepository<ContractVersion, UUID> {

    // Find all versions for a contract, ordered by version number
    List<ContractVersion> findByContract_ContractIdOrderByVersionNumberDesc(UUID contractId);

    // Find latest version for a contract
    @Query("SELECT cv FROM ContractVersion cv WHERE cv.contract.contractId = :contractId ORDER BY cv.versionNumber DESC LIMIT 1")
    Optional<ContractVersion> findLatestVersionByContractId(@Param("contractId") UUID contractId);

    // Find versions created by a specific user
    List<ContractVersion> findByCreatedBy_UserId(UUID userId);

    // Get maximum version number for a contract
    @Query("SELECT COALESCE(MAX(cv.versionNumber), 0) FROM ContractVersion cv WHERE cv.contract.contractId = :contractId")
    Integer getMaxVersionNumberByContractId(@Param("contractId") UUID contractId);
}
