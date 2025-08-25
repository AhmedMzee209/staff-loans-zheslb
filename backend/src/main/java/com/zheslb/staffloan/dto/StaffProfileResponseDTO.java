package com.zheslb.staffloan.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.ZonedDateTime;
import java.util.UUID;

@Schema(description = "Response payload containing staff profile information")
public class StaffProfileResponseDTO {
    
    @Schema(description = "Staff profile's unique identifier", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID profileId;
    
    @Schema(description = "Associated user ID", example = "456e7890-e12c-34d5-b678-542715286341")
    private UUID userId;
    
    @Schema(description = "User's email address", example = "john.doe@zheslb.com")
    private String userEmail;
    
    @Schema(description = "Staff member's first name", example = "John")
    private String firstName;
    
    @Schema(description = "Staff member's last name", example = "Doe")
    private String lastName;
    
    @Schema(description = "Department where the staff member works", example = "Finance")
    private String department;
    
    @Schema(description = "Job position of the staff member", example = "Senior Accountant")
    private String position;
    
    @Schema(description = "Zanzibar ID number", example = "ZNZ123456789")
    private String zanzibarId;
    
    @Schema(description = "Salary number", example = "SAL001234")
    private String salaryNumber;
    
    @Schema(description = "ZSSF (Zanzibar Social Security Fund) number", example = "ZSSF987654321")
    private String zssfNumber;
    
    @Schema(description = "Profile creation timestamp", example = "2025-07-31T08:30:00Z")
    private ZonedDateTime createdAt;
    
    @Schema(description = "Profile last update timestamp", example = "2025-07-31T10:15:00Z")
    private ZonedDateTime updatedAt;

    public StaffProfileResponseDTO() {}

    public StaffProfileResponseDTO(UUID profileId, UUID userId, String userEmail, String firstName, 
                                 String lastName, String department, String position, String zanzibarId, 
                                 String salaryNumber, String zssfNumber, ZonedDateTime createdAt, 
                                 ZonedDateTime updatedAt) {
        this.profileId = profileId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
        this.position = position;
        this.zanzibarId = zanzibarId;
        this.salaryNumber = salaryNumber;
        this.zssfNumber = zssfNumber;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    public UUID getProfileId() {
        return profileId;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getDepartment() {
        return department;
    }

    public String getPosition() {
        return position;
    }

    public String getZanzibarId() {
        return zanzibarId;
    }

    public String getSalaryNumber() {
        return salaryNumber;
    }

    public String getZssfNumber() {
        return zssfNumber;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }
}
