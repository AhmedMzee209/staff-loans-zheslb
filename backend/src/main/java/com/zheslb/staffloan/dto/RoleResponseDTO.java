package com.zheslb.staffloan.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Schema(description = "Response payload containing role information")
public class RoleResponseDTO {

    @Schema(description = "Role's unique identifier", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID id;

    @Schema(description = "Role name", example = "ADMIN")
    private String roleName;

    @Schema(description = "Description of the role", example = "Administrator with full system access")
    private String description;

    public RoleResponseDTO() {
    }

    public RoleResponseDTO(UUID id, String roleName) {
        this.id = id;
        this.roleName = roleName;
    }

    public RoleResponseDTO(UUID id, String roleName, String description) {
        this.id = id;
        this.roleName = roleName;
        this.description = description;
    }
}
