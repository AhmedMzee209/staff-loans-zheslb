package com.zheslb.staffloan.repository;

import com.zheslb.staffloan.model.UserRole;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {
    
    List<UserRole> findByUserAndIsActiveTrue(User user);
    
    List<UserRole> findByRoleAndIsActiveTrue(Role role);
    
    Optional<UserRole> findByUserAndRoleAndIsActiveTrue(User user, Role role);
    
    @Query("SELECT ur FROM UserRole ur WHERE ur.user.userId = :userId AND ur.isActive = true")
    List<UserRole> findActiveRolesByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT ur FROM UserRole ur WHERE ur.role.roleName = :roleName AND ur.isActive = true")
    List<UserRole> findActiveUsersByRoleName(@Param("roleName") String roleName);
    
    boolean existsByUserAndRoleAndIsActiveTrue(User user, Role role);
    
    @Query("SELECT COUNT(ur) FROM UserRole ur WHERE ur.user = :user AND ur.isActive = true")
    long countActiveRolesByUser(@Param("user") User user);
}