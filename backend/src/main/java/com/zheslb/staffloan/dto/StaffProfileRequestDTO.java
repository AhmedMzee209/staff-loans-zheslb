package com.zheslb.staffloan.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

@Schema(description = "Request payload for creating or updating a staff profile")
public class StaffProfileRequestDTO {
    
    @Schema(description = "User ID to associate with this staff profile", example = "123e4567-e89b-12d3-a456-426614174000", required = true)
    @NotNull(message = "User ID is required")
    private UUID userId;
    
    @Schema(description = "Staff member's first name", example = "John", required = true)
    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    private String firstName;
    
    @Schema(description = "Staff member's last name", example = "Doe", required = true)
    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name must not exceed 100 characters")
    private String lastName;
    
    @Schema(description = "Department where the staff member works", example = "Finance", required = true)
    @NotBlank(message = "Department is required")
    @Size(max = 100, message = "Department must not exceed 100 characters")
    private String department;
    
    @Schema(description = "Job position of the staff member", example = "Senior Accountant", required = true)
    @NotBlank(message = "Position is required")
    @Size(max = 100, message = "Position must not exceed 100 characters")
    private String position;
    
    @Schema(description = "Zanzibar ID number", example = "ZNZ123456789", required = true)
    @NotBlank(message = "Zanzibar ID is required")
    @Size(max = 50, message = "Zanzibar ID must not exceed 50 characters")
    private String zanzibarId;
    
    @Schema(description = "Salary number", example = "SAL001234", required = true)
    @NotBlank(message = "Salary number is required")
    @Size(max = 50, message = "Salary number must not exceed 50 characters")
    private String salaryNumber;
    
    @Schema(description = "ZSSF (Zanzibar Social Security Fund) number", example = "ZSSF987654321", required = true)
    @NotBlank(message = "ZSSF number is required")
    @Size(max = 50, message = "ZSSF number must not exceed 50 characters")
    private String zssfNumber;

    // Getters and setters
    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getZanzibarId() {
        return zanzibarId;
    }

    public void setZanzibarId(String zanzibarId) {
        this.zanzibarId = zanzibarId;
    }

    public String getSalaryNumber() {
        return salaryNumber;
    }

    public void setSalaryNumber(String salaryNumber) {
        this.salaryNumber = salaryNumber;
    }

    public String getZssfNumber() {
        return zssfNumber;
    }

    public void setZssfNumber(String zssfNumber) {
        this.zssfNumber = zssfNumber;
    }
}
