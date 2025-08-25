package com.zheslb.staffloan.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zheslb.staffloan.dto.request.AuditLogRequestDTO;
import com.zheslb.staffloan.dto.response.AuditLogResponseDTO;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.model.AuditLog;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.AuditLogRepository;
import com.zheslb.staffloan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    /**
     * Create a new audit log entry
     */
    public AuditLogResponseDTO create(AuditLogRequestDTO requestDTO) {
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        AuditLog auditLog = mapToEntity(requestDTO);
        auditLog.setUser(user);
        auditLog.setCreatedAt(Instant.now());

        AuditLog savedAuditLog = auditLogRepository.save(auditLog);
        log.info("Audit log created: {} action on {} by user {}",
                requestDTO.getAction(), requestDTO.getEntityType(), user.getEmail());

        return mapToResponseDTO(savedAuditLog);
    }

    /**
     * Log a CRUD operation with automatic JSON serialization
     */
    public void logAction(UUID userId, String action, String entityType, UUID entityId,
            Object oldValues, Object newValues, String ipAddress) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            JsonNode oldValuesJson = oldValues != null ? objectMapper.valueToTree(oldValues) : null;
            JsonNode newValuesJson = newValues != null ? objectMapper.valueToTree(newValues) : null;

            AuditLog auditLog = AuditLog.builder()
                    .user(user)
                    .action(action)
                    .entityType(entityType)
                    .entityId(entityId)
                    .oldValues(oldValuesJson)
                    .newValues(newValuesJson)
                    .ipAddress(ipAddress)
                    .createdAt(Instant.now())
                    .build();

            auditLogRepository.save(auditLog);
            log.debug("Audit log created: {} action on {} entity {} by user {}",
                    action, entityType, entityId, user.getEmail());

        } catch (Exception e) {
            log.error("Failed to create audit log for user {} action {} on {} entity {}: {}",
                    userId, action, entityType, entityId, e.getMessage());
        }
    }

    /**
     * Convenience method for CREATE operations
     */
    public void logCreate(UUID userId, String entityType, UUID entityId, Object newValues, String ipAddress) {
        logAction(userId, "CREATE", entityType, entityId, null, newValues, ipAddress);
    }

    /**
     * Convenience method for UPDATE operations
     */
    public void logUpdate(UUID userId, String entityType, UUID entityId, Object oldValues, Object newValues,
            String ipAddress) {
        logAction(userId, "UPDATE", entityType, entityId, oldValues, newValues, ipAddress);
    }

    /**
     * Convenience method for DELETE operations
     */
    public void logDelete(UUID userId, String entityType, UUID entityId, Object oldValues, String ipAddress) {
        logAction(userId, "DELETE", entityType, entityId, oldValues, null, ipAddress);
    }

    /**
     * Get all audit logs with pagination
     */
    @Transactional(readOnly = true)
    public Page<AuditLogResponseDTO> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return auditLogRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::mapToResponseDTO);
    }

    /**
     * Get all audit logs (without pagination)
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getAll() {
        return auditLogRepository.findAllWithUserDetails()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit log by ID
     */
    @Transactional(readOnly = true)
    public AuditLogResponseDTO getById(UUID logId) {
        AuditLog auditLog = auditLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Audit log not found"));

        return mapToResponseDTO(auditLog);
    }

    /**
     * Get audit logs by user ID
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByUserId(UUID userId) {
        return auditLogRepository.findByUser_UserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by entity type
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByEntityType(String entityType) {
        return auditLogRepository.findByEntityTypeOrderByCreatedAtDesc(entityType)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by entity ID
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByEntityId(UUID entityId) {
        return auditLogRepository.findByEntityIdOrderByCreatedAtDesc(entityId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by action type
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByAction(String action) {
        return auditLogRepository.findByActionOrderByCreatedAtDesc(action)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by entity type and entity ID
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByEntityTypeAndEntityId(String entityType, UUID entityId) {
        return auditLogRepository.findByEntityTypeAndEntityIdOrderByCreatedAtDesc(entityType, entityId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by user and entity type
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByUserIdAndEntityType(UUID userId, String entityType) {
        return auditLogRepository.findByUser_UserIdAndEntityTypeOrderByCreatedAtDesc(userId, entityType)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by date range
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByDateRange(Instant startDate, Instant endDate) {
        return auditLogRepository.findByCreatedAtBetweenOrderByCreatedAtDesc(startDate, endDate)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by user and date range
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByUserIdAndDateRange(UUID userId, Instant startDate, Instant endDate) {
        return auditLogRepository.findByUser_UserIdAndCreatedAtBetweenOrderByCreatedAtDesc(userId, startDate, endDate)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by IP address
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByIpAddress(String ipAddress) {
        return auditLogRepository.findByIpAddressOrderByCreatedAtDesc(ipAddress)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit logs by multiple actions
     */
    @Transactional(readOnly = true)
    public List<AuditLogResponseDTO> getByActions(List<String> actions) {
        return auditLogRepository.findByActionsIn(actions)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get audit log statistics
     */
    @Transactional(readOnly = true)
    public AuditLogStats getStatistics() {
        long totalLogs = auditLogRepository.count();
        long createActions = auditLogRepository.countByAction("CREATE");
        long updateActions = auditLogRepository.countByAction("UPDATE");
        long deleteActions = auditLogRepository.countByAction("DELETE");

        return AuditLogStats.builder()
                .totalLogs(totalLogs)
                .createActions(createActions)
                .updateActions(updateActions)
                .deleteActions(deleteActions)
                .build();
    }

    /**
     * Delete audit log (should be rarely used, for admin purposes only)
     */
    public void delete(UUID logId) {
        AuditLog auditLog = auditLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Audit log not found"));

        auditLogRepository.deleteById(logId);
        log.warn("Audit log deleted: {} (This should be rare!)", logId);
    }

    private AuditLog mapToEntity(AuditLogRequestDTO requestDTO) {
        return AuditLog.builder()
                .action(requestDTO.getAction())
                .entityType(requestDTO.getEntityType())
                .entityId(requestDTO.getEntityId())
                .oldValues(requestDTO.getOldValues())
                .newValues(requestDTO.getNewValues())
                .ipAddress(requestDTO.getIpAddress())
                .build();
    }

    private AuditLogResponseDTO mapToResponseDTO(AuditLog auditLog) {
        return AuditLogResponseDTO.builder()
                .logId(auditLog.getLogId())
                .userId(auditLog.getUser() != null ? auditLog.getUser().getUserId() : null)
                .userEmail(auditLog.getUser() != null ? auditLog.getUser().getEmail() : null)
                .userFullName(auditLog.getUser() != null ? auditLog.getUser().getEmail() : null)
                .action(auditLog.getAction())
                .entityType(auditLog.getEntityType())
                .entityId(auditLog.getEntityId())
                .oldValues(auditLog.getOldValues())
                .newValues(auditLog.getNewValues())
                .ipAddress(auditLog.getIpAddress())
                .createdAt(auditLog.getCreatedAt())
                .build();
    }

    @lombok.Data
    @lombok.Builder
    @lombok.AllArgsConstructor
    @lombok.NoArgsConstructor
    public static class AuditLogStats {
        private long totalLogs;
        private long createActions;
        private long updateActions;
        private long deleteActions;
    }
}
