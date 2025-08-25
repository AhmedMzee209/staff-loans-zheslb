package com.zheslb.staffloan.model;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Audit log entry tracking all CRUD operations in the system")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "log_id")
    @Schema(description = "Unique identifier for the audit log entry", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID logId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @Schema(description = "User who performed the action")
    private User user;

    @Column(name = "action", nullable = false, length = 100)
    @Schema(description = "Action performed (CREATE, UPDATE, DELETE)", example = "CREATE", maxLength = 100)
    private String action;

    @Column(name = "entity_type", nullable = false, length = 100)
    @Schema(description = "Type of entity affected", example = "LoanApplication", maxLength = 100)
    private String entityType;

    @Column(name = "entity_id")
    @Schema(description = "ID of the entity affected", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID entityId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "old_values", columnDefinition = "jsonb")
    @Schema(description = "Previous values before the change (JSON format)")
    private JsonNode oldValues;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "new_values", columnDefinition = "jsonb")
    @Schema(description = "New values after the change (JSON format)")
    private JsonNode newValues;

    @Column(name = "ip_address", length = 45)
    @Schema(description = "IP address of the client who made the request", example = "192.168.1.100", maxLength = 45)
    private String ipAddress;

    @Column(name = "created_at")
    @Schema(description = "Timestamp when the action was performed", example = "2024-08-04T10:30:00Z")
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }
}
