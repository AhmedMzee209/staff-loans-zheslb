package com.zheslb.staffloan.service;

import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.model.Role;
import com.zheslb.staffloan.model.UserRole;
import com.zheslb.staffloan.repository.UserRepository;
import com.zheslb.staffloan.repository.RoleRepository;
import com.zheslb.staffloan.repository.UserRoleRepository;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleManagementService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    public User assignRoleToUser(UUID userId, UUID roleId, UUID assignedByUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        // Check if user already has this role
        if (userRoleRepository.existsByUserAndRoleAndIsActiveTrue(user, role)) {
            throw new IllegalArgumentException("User already has this role");
        }

        UserRole userRole = UserRole.builder()
                .user(user)
                .role(role)
                .assignedBy(assignedByUserId)
                .assignedAt(OffsetDateTime.now())
                .isActive(true)
                .build();

        userRoleRepository.save(userRole);

        // Update user's primary role if they don't have one
        if (user.getRole() == null) {
            user.setRole(role);
            user.setUpdatedAt(OffsetDateTime.now());
            userRepository.save(user);
        }

        return userRepository.findById(userId).orElse(user);
    }

    public User assignRoleToUser(UUID userId, String roleName, UUID assignedByUserId) {
        Role role = roleRepository.findByRoleName(roleName.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));
        
        return assignRoleToUser(userId, role.getRoleId(), assignedByUserId);
    }

    public User removeRoleFromUser(UUID userId, UUID roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        UserRole userRole = userRoleRepository.findByUserAndRoleAndIsActiveTrue(user, role)
                .orElseThrow(() -> new ResourceNotFoundException("User does not have this role"));

        // Deactivate the role assignment
        userRole.setIsActive(false);
        userRole.setUpdatedAt(OffsetDateTime.now());
        userRoleRepository.save(userRole);

        // If this was the primary role, set a new primary role
        if (user.getRole() != null && user.getRole().getRoleId().equals(roleId)) {
            Set<Role> remainingRoles = user.getRoles();
            remainingRoles.remove(role);
            
            if (!remainingRoles.isEmpty()) {
                user.setRole(remainingRoles.iterator().next());
            } else {
                user.setRole(null);
            }
            user.setUpdatedAt(OffsetDateTime.now());
            userRepository.save(user);
        }

        return userRepository.findById(userId).orElse(user);
    }

    public User removeRoleFromUser(UUID userId, String roleName) {
        Role role = roleRepository.findByRoleName(roleName.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));
        
        return removeRoleFromUser(userId, role.getRoleId());
    }

    public User setPrimaryRole(UUID userId, UUID roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        // Verify user has this role
        if (!user.hasRole(role.getRoleName())) {
            throw new IllegalArgumentException("User does not have this role");
        }

        user.setRole(role);
        user.setUpdatedAt(OffsetDateTime.now());
        return userRepository.save(user);
    }

    public List<User> getUsersByRole(String roleName) {
        return userRoleRepository.findActiveUsersByRoleName(roleName.toUpperCase())
                .stream()
                .map(UserRole::getUser)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<Role> getUserRoles(UUID userId) {
        return userRoleRepository.findActiveRolesByUserId(userId)
                .stream()
                .map(UserRole::getRole)
                .collect(Collectors.toList());
    }

    public List<User> getAllUsersWithRoles() {
        return userRepository.findAll();
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Transactional(readOnly = true)
    public boolean userHasRole(UUID userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.hasRole(roleName);
    }

    @Transactional(readOnly = true)
    public boolean userHasAnyRole(UUID userId, String... roleNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return user.hasAnyRole(roleNames);
    }

    public User assignMultipleRoles(UUID userId, List<UUID> roleIds, UUID assignedByUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        for (UUID roleId : roleIds) {
            try {
                assignRoleToUser(userId, roleId, assignedByUserId);
            } catch (IllegalArgumentException e) {
                // Skip if user already has the role
                if (!e.getMessage().contains("already has this role")) {
                    throw e;
                }
            }
        }

        return userRepository.findById(userId).orElse(user);
    }

    public User syncUserRoles(UUID userId, List<UUID> roleIds, UUID assignedByUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Get current active roles
        List<UserRole> currentUserRoles = userRoleRepository.findByUserAndIsActiveTrue(user);
        Set<UUID> currentRoleIds = currentUserRoles.stream()
                .map(ur -> ur.getRole().getRoleId())
                .collect(Collectors.toSet());

        // Remove roles that are not in the new list
        for (UserRole userRole : currentUserRoles) {
            if (!roleIds.contains(userRole.getRole().getRoleId())) {
                userRole.setIsActive(false);
                userRole.setUpdatedAt(OffsetDateTime.now());
                userRoleRepository.save(userRole);
            }
        }

        // Add new roles
        for (UUID roleId : roleIds) {
            if (!currentRoleIds.contains(roleId)) {
                assignRoleToUser(userId, roleId, assignedByUserId);
            }
        }

        return userRepository.findById(userId).orElse(user);
    }
}