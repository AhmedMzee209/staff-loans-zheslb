package com.zheslb.staffloan.service;

import com.zheslb.staffloan.model.Role;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.RoleRepository;
import com.zheslb.staffloan.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserRoleInitializationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RoleManagementService roleManagementService;

    /**
     * Ensures all users have STAFF role as per business requirements.
     * This method can be called to audit and fix existing users.
     */
    @Transactional
    public void ensureAllUsersHaveStaffRole() {
        log.info("Starting process to ensure all users have STAFF role...");

        // Get STAFF role
        Role staffRole = roleRepository.findByRoleName("STAFF")
                .orElseThrow(() -> new RuntimeException("STAFF role not found in system"));

        // Get all users
        List<User> allUsers = userRepository.findAll();
        
        int usersProcessed = 0;
        int usersUpdated = 0;

        for (User user : allUsers) {
            usersProcessed++;
            
            // Check if user already has STAFF role
            if (!user.hasRole("STAFF")) {
                try {
                    // Assign STAFF role - use system admin (null) as assignedBy for system operations
                    roleManagementService.assignRoleToUser(
                        user.getUserId(), 
                        staffRole.getRoleId(), 
                        null // System assignment
                    );
                    
                    usersUpdated++;
                    log.info("Assigned STAFF role to user: {}", user.getEmail());
                    
                } catch (Exception e) {
                    log.error("Failed to assign STAFF role to user {}: {}", user.getEmail(), e.getMessage());
                }
            } else {
                log.debug("User {} already has STAFF role", user.getEmail());
            }
        }

        log.info("Completed STAFF role assignment process. Processed: {}, Updated: {}", 
                usersProcessed, usersUpdated);
    }

    /**
     * Audit method to check how many users don't have STAFF role
     */
    @Transactional(readOnly = true)
    public AuditResult auditUsersWithoutStaffRole() {
        List<User> allUsers = userRepository.findAll();
        
        int totalUsers = allUsers.size();
        int usersWithStaff = 0;
        int usersWithoutStaff = 0;

        for (User user : allUsers) {
            if (user.hasRole("STAFF")) {
                usersWithStaff++;
            } else {
                usersWithoutStaff++;
                log.warn("User without STAFF role: {}", user.getEmail());
            }
        }

        return new AuditResult(totalUsers, usersWithStaff, usersWithoutStaff);
    }

    public static class AuditResult {
        public final int totalUsers;
        public final int usersWithStaff;
        public final int usersWithoutStaff;

        public AuditResult(int totalUsers, int usersWithStaff, int usersWithoutStaff) {
            this.totalUsers = totalUsers;
            this.usersWithStaff = usersWithStaff;
            this.usersWithoutStaff = usersWithoutStaff;
        }

        @Override
        public String toString() {
            return String.format("Audit Result - Total: %d, With STAFF: %d, Without STAFF: %d", 
                    totalUsers, usersWithStaff, usersWithoutStaff);
        }
    }
}