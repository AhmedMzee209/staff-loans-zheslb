package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.UserRoleAssignmentDTO;
import com.zheslb.staffloan.dto.response.UserWithRolesDTO;
import com.zheslb.staffloan.model.Role;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.model.UserRole;
import com.zheslb.staffloan.repository.UserRepository;
import com.zheslb.staffloan.service.RoleManagementService;
import com.zheslb.staffloan.service.UserRoleInitializationService;
import com.zheslb.staffloan.security.CustomUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/role-management")
@RequiredArgsConstructor
@Tag(name = "Role Management", description = "APIs for managing user roles (Admin only)")
@PreAuthorize("hasRole('ADMIN')")
public class RoleManagementController {

    private final RoleManagementService roleManagementService;
    private final UserRepository userRepository;
    private final UserRoleInitializationService userRoleInitializationService;

    @Operation(summary = "Get all users with their roles", description = "Retrieves all users in the system with their assigned roles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully"),
            @ApiResponse(responseCode = "403", description = "Access denied - Admin role required")
    })
    @GetMapping("/users")
    public ResponseEntity<List<UserWithRolesDTO>> getAllUsersWithRoles() {
        List<User> users = roleManagementService.getAllUsersWithRoles();
        List<UserWithRolesDTO> userDTOs = users.stream()
                .map(this::mapToUserWithRolesDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    @Operation(summary = "Get user with roles by ID", description = "Retrieves a specific user with their assigned roles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserWithRolesDTO> getUserWithRoles(
            @Parameter(description = "User ID", required = true) @PathVariable UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new com.zheslb.staffloan.exception.ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(mapToUserWithRolesDTO(user));
    }

    @Operation(summary = "Assign roles to user", description = "Assigns multiple roles to a user, replacing existing role assignments")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Roles assigned successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "404", description = "User or role not found")
    })
    @PostMapping("/assign-roles")
    public ResponseEntity<UserWithRolesDTO> assignRolesToUser(
            @Parameter(description = "Role assignment data", required = true) @Valid @RequestBody UserRoleAssignmentDTO assignmentDTO,
            @AuthenticationPrincipal CustomUserDetailsService.UserPrincipal principal) {
        
        UUID assignedByUserId = principal.getId();
        
        // Sync user roles (replace existing with new ones)
        User updatedUser = roleManagementService.syncUserRoles(
                assignmentDTO.getUserId(), 
                assignmentDTO.getRoleIds(), 
                assignedByUserId
        );

        // Set primary role if specified
        if (assignmentDTO.getPrimaryRoleId() != null) {
            updatedUser = roleManagementService.setPrimaryRole(
                    assignmentDTO.getUserId(), 
                    assignmentDTO.getPrimaryRoleId()
            );
        }

        return ResponseEntity.ok(mapToUserWithRolesDTO(updatedUser));
    }

    @Operation(summary = "Add role to user", description = "Adds a single role to a user without affecting existing roles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Role added successfully"),
            @ApiResponse(responseCode = "400", description = "User already has this role"),
            @ApiResponse(responseCode = "404", description = "User or role not found")
    })
    @PostMapping("/users/{userId}/roles/{roleId}")
    public ResponseEntity<UserWithRolesDTO> addRoleToUser(
            @Parameter(description = "User ID", required = true) @PathVariable UUID userId,
            @Parameter(description = "Role ID", required = true) @PathVariable UUID roleId,
            @AuthenticationPrincipal CustomUserDetailsService.UserPrincipal principal) {
        
        User updatedUser = roleManagementService.assignRoleToUser(userId, roleId, principal.getId());
        return ResponseEntity.ok(mapToUserWithRolesDTO(updatedUser));
    }

    @Operation(summary = "Remove role from user", description = "Removes a specific role from a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Role removed successfully"),
            @ApiResponse(responseCode = "404", description = "User, role, or assignment not found")
    })
    @DeleteMapping("/users/{userId}/roles/{roleId}")
    public ResponseEntity<UserWithRolesDTO> removeRoleFromUser(
            @Parameter(description = "User ID", required = true) @PathVariable UUID userId,
            @Parameter(description = "Role ID", required = true) @PathVariable UUID roleId) {
        
        User updatedUser = roleManagementService.removeRoleFromUser(userId, roleId);
        return ResponseEntity.ok(mapToUserWithRolesDTO(updatedUser));
    }

    @Operation(summary = "Set primary role", description = "Sets a user's primary role from their assigned roles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Primary role set successfully"),
            @ApiResponse(responseCode = "400", description = "User does not have this role"),
            @ApiResponse(responseCode = "404", description = "User or role not found")
    })
    @PutMapping("/users/{userId}/primary-role/{roleId}")
    public ResponseEntity<UserWithRolesDTO> setPrimaryRole(
            @Parameter(description = "User ID", required = true) @PathVariable UUID userId,
            @Parameter(description = "Role ID", required = true) @PathVariable UUID roleId) {
        
        User updatedUser = roleManagementService.setPrimaryRole(userId, roleId);
        return ResponseEntity.ok(mapToUserWithRolesDTO(updatedUser));
    }

    @Operation(summary = "Get all available roles", description = "Retrieves all roles available in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Roles retrieved successfully")
    })
    @GetMapping("/roles")
    public ResponseEntity<List<UserWithRolesDTO.RoleDTO>> getAllRoles() {
        List<Role> roles = roleManagementService.getAllRoles();
        List<UserWithRolesDTO.RoleDTO> roleDTOs = roles.stream()
                .map(role -> UserWithRolesDTO.RoleDTO.builder()
                        .roleId(role.getRoleId())
                        .roleName(role.getRoleName())
                        .description(role.getDescription())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(roleDTOs);
    }

    @Operation(summary = "Get users by role", description = "Retrieves all users who have a specific role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Role not found")
    })
    @GetMapping("/roles/{roleName}/users")
    public ResponseEntity<List<UserWithRolesDTO>> getUsersByRole(
            @Parameter(description = "Role name", required = true) @PathVariable String roleName) {
        
        List<User> users = roleManagementService.getUsersByRole(roleName);
        List<UserWithRolesDTO> userDTOs = users.stream()
                .map(this::mapToUserWithRolesDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    @Operation(summary = "Ensure all users have STAFF role", description = "System maintenance endpoint to ensure all users have required STAFF role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "STAFF role assignment completed"),
            @ApiResponse(responseCode = "403", description = "Access denied - Admin role required")
    })
    @PostMapping("/ensure-staff-roles")
    public ResponseEntity<String> ensureAllUsersHaveStaffRole() {
        userRoleInitializationService.ensureAllUsersHaveStaffRole();
        return ResponseEntity.ok("STAFF role assignment process completed successfully");
    }

    @Operation(summary = "Audit users without STAFF role", description = "Check how many users don't have the required STAFF role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Audit completed"),
            @ApiResponse(responseCode = "403", description = "Access denied - Admin role required")
    })
    @GetMapping("/audit-staff-roles")
    public ResponseEntity<String> auditUsersWithoutStaffRole() {
        var auditResult = userRoleInitializationService.auditUsersWithoutStaffRole();
        return ResponseEntity.ok(auditResult.toString());
    }

    private UserWithRolesDTO mapToUserWithRolesDTO(User user) {
        UserWithRolesDTO.RoleDTO primaryRoleDTO = null;
        Role primaryRole = user.getPrimaryRole();
        if (primaryRole != null) {
            primaryRoleDTO = UserWithRolesDTO.RoleDTO.builder()
                    .roleId(primaryRole.getRoleId())
                    .roleName(primaryRole.getRoleName())
                    .description(primaryRole.getDescription())
                    .build();
        }

        List<UserWithRolesDTO.UserRoleDetailsDTO> roleDetails = user.getUserRoles().stream()
                .map(userRole -> {
                    // Get assignedBy user email for display
                    String assignedByEmail = null;
                    if (userRole.getAssignedBy() != null) {
                        assignedByEmail = userRepository.findById(userRole.getAssignedBy())
                                .map(User::getEmail)
                                .orElse("Unknown");
                    }

                    return UserWithRolesDTO.UserRoleDetailsDTO.builder()
                            .userRoleId(userRole.getUserRoleId())
                            .role(UserWithRolesDTO.RoleDTO.builder()
                                    .roleId(userRole.getRole().getRoleId())
                                    .roleName(userRole.getRole().getRoleName())
                                    .description(userRole.getRole().getDescription())
                                    .build())
                            .assignedAt(userRole.getAssignedAt())
                            .assignedBy(userRole.getAssignedBy())
                            .assignedByEmail(assignedByEmail)
                            .isActive(userRole.getIsActive())
                            .build();
                })
                .collect(Collectors.toList());

        return UserWithRolesDTO.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .primaryRole(primaryRoleDTO)
                .roles(roleDetails)
                .build();
    }
}