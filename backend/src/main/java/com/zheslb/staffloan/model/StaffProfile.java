package com.zheslb.staffloan.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "staff_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Staff profile entity representing detailed information about staff members")
public class StaffProfile {

    @Id
    @GeneratedValue
    @Column(name = "profile_id", columnDefinition = "UUID", updatable = false, nullable = false)
    @Schema(description = "Unique identifier for the staff profile", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID profileId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @Schema(description = "Associated user account")
    private User user;

    @Column(name = "first_name", nullable = false, length = 100)
    @Schema(description = "Staff member's first name", example = "John")
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    @Schema(description = "Staff member's last name", example = "Doe")
    private String lastName;

    @Column(name = "department", nullable = false, length = 100)
    @Schema(description = "Department where the staff member works", example = "Finance")
    private String department;

    @Column(name = "position", nullable = false, length = 100)
    @Schema(description = "Job position of the staff member", example = "Senior Accountant")
    private String position;

    @Column(name = "zanzibar_id", nullable = false, unique = true, length = 50)
    @Schema(description = "Zanzibar ID number", example = "ZNZ123456789")
    private String zanzibarId;

    @Column(name = "salary_number", nullable = false, length = 50)
    @Schema(description = "Salary number", example = "SAL001234")
    private String salaryNumber;

    @Column(name = "zssf_number", nullable = false, length = 50)
    @Schema(description = "ZSSF (Zanzibar Social Security Fund) number", example = "ZSSF987654321")
    private String zssfNumber;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @Schema(description = "Profile creation timestamp", example = "2025-07-31T08:30:00Z")
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    @Schema(description = "Profile last update timestamp", example = "2025-07-31T10:15:00Z")
    private ZonedDateTime updatedAt;
}
