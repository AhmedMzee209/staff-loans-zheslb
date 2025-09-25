package com.zheslb.staffloan.model;


import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "user_id", updatable = false, nullable = false)
    private UUID userId;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    // Keep for backward compatibility - primary role
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = true)
    private Role role;

    // New many-to-many relationship for multiple roles
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Builder.Default
    private Set<UserRole> userRoles = new HashSet<>();

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "created_at")
    @Builder.Default
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    // Convenience methods for role management
    public Set<Role> getRoles() {
        return userRoles.stream()
                .filter(UserRole::getIsActive)
                .map(UserRole::getRole)
                .collect(Collectors.toSet());
    }

    public Set<String> getRoleNames() {
        return getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
    }

    public boolean hasRole(String roleName) {
        return getRoleNames().contains(roleName.toUpperCase());
    }

    public boolean hasAnyRole(String... roleNames) {
        Set<String> userRoleNames = getRoleNames();
        for (String roleName : roleNames) {
            if (userRoleNames.contains(roleName.toUpperCase())) {
                return true;
            }
        }
        return false;
    }

    // Get primary role (for backward compatibility)
    public Role getPrimaryRole() {
        if (role != null) {
            return role;
        }
        // If no primary role set, return first active role
        return userRoles.stream()
                .filter(UserRole::getIsActive)
                .map(UserRole::getRole)
                .findFirst()
                .orElse(null);
    }
}
