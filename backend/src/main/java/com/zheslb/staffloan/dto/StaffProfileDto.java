package com.zheslb.staffloan.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
@Schema(description = "Staff profile data transfer object for creating and updating staff profiles")
public class StaffProfileDto {

    @Schema(description = "Staff profile's unique identifier", example = "123e4567-e89b-12d3-a456-426614174000", accessMode = Schema.AccessMode.READ_ONLY)
    private UUID profileId;

    @Schema(description = "User ID to associate with this staff profile", example = "456e7890-e12c-34d5-b678-542715286341", required = true)
    private UUID userId;

    @Schema(description = "Staff member's first name", example = "John", required = true)
    @NotBlank(message = "First name is required")
    @Size(max = 100)
    private String firstName;

    @Schema(description = "Staff member's last name", example = "Doe", required = true)
    @NotBlank(message = "Last name is required")
    @Size(max = 100)
    private String lastName;

    @Schema(description = "Department where the staff member works", example = "Finance", required = true)
    @NotBlank(message = "Department is required")
    @Size(max = 100)
    private String department;

    @Schema(description = "Job position of the staff member", example = "Senior Accountant", required = true)
    @NotBlank(message = "Position is required")
    @Size(max = 100)
    private String position;

    @Schema(description = "Zanzibar ID number", example = "ZNZ123456789", required = true)
    @NotBlank(message = "Zanzibar ID is required")
    @Size(max = 50)
    private String zanzibarId;

    @Schema(description = "Salary number", example = "SAL001234", required = true)
    @NotBlank(message = "Salary number is required")
    @Size(max = 50)
    private String salaryNumber;

    @Schema(description = "ZSSF (Zanzibar Social Security Fund) number", example = "ZSSF987654321", required = true)
    @NotBlank(message = "ZSSF number is required")
    @Size(max = 50)
    private String zssfNumber;
}
