package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {

    // Find audit logs by user ID
    List<AuditLog> findByUser_UserIdOrderByCreatedAtDesc(UUID userId);

    // Find audit logs by entity type
    List<AuditLog> findByEntityTypeOrderByCreatedAtDesc(String entityType);

    // Find audit logs by entity ID
    List<AuditLog> findByEntityIdOrderByCreatedAtDesc(UUID entityId);

    // Find audit logs by action type
    List<AuditLog> findByActionOrderByCreatedAtDesc(String action);

    // Find audit logs by entity type and entity ID
    List<AuditLog> findByEntityTypeAndEntityIdOrderByCreatedAtDesc(String entityType, UUID entityId);

    // Find audit logs by user and entity type
    List<AuditLog> findByUser_UserIdAndEntityTypeOrderByCreatedAtDesc(UUID userId, String entityType);

    // Find audit logs by date range
    List<AuditLog> findByCreatedAtBetweenOrderByCreatedAtDesc(Instant startDate, Instant endDate);

    // Find audit logs by user and date range
    List<AuditLog> findByUser_UserIdAndCreatedAtBetweenOrderByCreatedAtDesc(UUID userId, Instant startDate,
            Instant endDate);

    // Find audit logs by entity type and date range
    List<AuditLog> findByEntityTypeAndCreatedAtBetweenOrderByCreatedAtDesc(String entityType, Instant startDate,
            Instant endDate);

    // Find recent audit logs (pageable)
    Page<AuditLog> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // Find audit logs by IP address
    List<AuditLog> findByIpAddressOrderByCreatedAtDesc(String ipAddress);

    // Custom query to find audit logs with user details
    @Query("SELECT al FROM AuditLog al LEFT JOIN FETCH al.user u ORDER BY al.createdAt DESC")
    List<AuditLog> findAllWithUserDetails();

    // Custom query to find audit logs by multiple actions
    @Query("SELECT al FROM AuditLog al WHERE al.action IN :actions ORDER BY al.createdAt DESC")
    List<AuditLog> findByActionsIn(@Param("actions") List<String> actions);

    // Count audit logs by entity type
    long countByEntityType(String entityType);

    // Count audit logs by user
    long countByUser_UserId(UUID userId);

    // Count audit logs by action
    long countByAction(String action);
}
