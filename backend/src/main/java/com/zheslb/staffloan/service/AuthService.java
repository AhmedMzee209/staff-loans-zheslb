package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.request.LoginRequestDTO;
import com.zheslb.staffloan.dto.request.RegisterRequestDTO;
import com.zheslb.staffloan.dto.response.AuthResponseDTO;
import com.zheslb.staffloan.dto.response.CurrentUserDTO;
import com.zheslb.staffloan.exception.ResourceNotFoundException;
import com.zheslb.staffloan.model.Role;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.RoleRepository;
import com.zheslb.staffloan.repository.UserRepository;
import com.zheslb.staffloan.security.CustomUserDetailsService;
import com.zheslb.staffloan.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuditLogService auditLogService;

    /**
     * Authenticate user and generate JWT token
     */
    public AuthResponseDTO login(LoginRequestDTO loginRequest, String ipAddress) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        // Set authentication in security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token
        String jwt = jwtTokenProvider.generateToken(authentication);

        // Get user details
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Log the login action
        try {
            auditLogService.logAction(user.getUserId(), "LOGIN", "User", user.getUserId(),
                    null, "User logged in", ipAddress);
        } catch (Exception e) {
            log.warn("Failed to log login action for user: {}", user.getEmail(), e);
        }

        // Build response
        CurrentUserDTO currentUser = mapToCurrentUserDTO(user);

        return AuthResponseDTO.builder()
                .accessToken(jwt)
                .tokenType("Bearer")
                .expiresIn(86400000L) // 24 hours in milliseconds
                .user(currentUser)
                .build();
    }

    /**
     * Register a new user (Admin only)
     */
    public CurrentUserDTO register(RegisterRequestDTO registerRequest, String ipAddress) {
        // Check if user already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }

        // Get the role
        Role role = roleRepository.findById(registerRequest.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        // Create new user
        User user = User.builder()
                .email(registerRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .role(role)
                .isActive(registerRequest.getIsActive())
                .createdAt(OffsetDateTime.now())
                .updatedAt(OffsetDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        // Get current admin user for audit logging
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetailsService.UserPrincipal) {
            CustomUserDetailsService.UserPrincipal principal = (CustomUserDetailsService.UserPrincipal) authentication
                    .getPrincipal();

            try {
                auditLogService.logCreate(
                        java.util.UUID.fromString(principal.getUserId()),
                        "User",
                        savedUser.getUserId(),
                        savedUser,
                        ipAddress);
            } catch (Exception e) {
                log.warn("Failed to log user creation for: {}", savedUser.getEmail(), e);
            }
        }

        log.info("New user registered: {}", savedUser.getEmail());
        return mapToCurrentUserDTO(savedUser);
    }

    /**
     * Get current authenticated user
     */
    public CurrentUserDTO getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No authenticated user found");
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return mapToCurrentUserDTO(user);
    }

    /**
     * Check if email exists
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    private CurrentUserDTO mapToCurrentUserDTO(User user) {
        CurrentUserDTO.RoleInfo roleInfo = CurrentUserDTO.RoleInfo.builder()
                .roleId(user.getRole().getRoleId())
                .roleName(user.getRole().getRoleName())
                .description(user.getRole().getDescription())
                .build();

        return CurrentUserDTO.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .role(roleInfo)
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
