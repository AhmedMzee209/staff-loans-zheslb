package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.RoleRequestDTO;
import com.zheslb.staffloan.dto.RoleResponseDTO;
import com.zheslb.staffloan.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/roles")
@Tag(name = "Role Management", description = "APIs for managing roles in the staff loan system")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Operation(summary = "Create a new role", description = "Creates a new role in the system with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Role created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = RoleResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "409", description = "Role with name already exists")
    })
    @PostMapping
    public ResponseEntity<RoleResponseDTO> createRole(
            @Parameter(description = "Role data to create", required = true) @Valid @RequestBody RoleRequestDTO dto) {
        RoleResponseDTO createdRole = roleService.createRole(dto);
        return new ResponseEntity<>(createdRole, HttpStatus.CREATED);
    }

    @Operation(summary = "Get all roles", description = "Retrieves a list of all roles in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Roles retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = RoleResponseDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<RoleResponseDTO>> getAllRoles() {
        List<RoleResponseDTO> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

    @Operation(summary = "Get role by ID", description = "Retrieves a specific role by its unique identifier")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Role found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = RoleResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Role not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<RoleResponseDTO> getRole(
            @Parameter(description = "Role ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id) {
        RoleResponseDTO role = roleService.getRoleById(id);
        return ResponseEntity.ok(role);
    }

    @Operation(summary = "Update role", description = "Updates an existing role with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Role updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = RoleResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Role not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<RoleResponseDTO> updateRole(
            @Parameter(description = "Role ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id,
            @Parameter(description = "Updated role data", required = true) @Valid @RequestBody RoleRequestDTO dto) {
        RoleResponseDTO updatedRole = roleService.updateRole(id, dto);
        return ResponseEntity.ok(updatedRole);
    }

    @Operation(summary = "Delete role", description = "Deletes a role from the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Role deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Role not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(
            @Parameter(description = "Role ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}
