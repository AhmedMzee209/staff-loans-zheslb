package com.zheslb.staffloan.controller;

import com.zheslb.staffloan.dto.request.LoginRequestDTO;
import com.zheslb.staffloan.dto.request.RegisterRequestDTO;
import com.zheslb.staffloan.dto.response.AuthResponseDTO;
import com.zheslb.staffloan.dto.response.CurrentUserDTO;
import com.zheslb.staffloan.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "APIs for user authentication, registration, and user management")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "User login", description = "Authenticates a user and returns a JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Parameter(description = "Login credentials", required = true) @Valid @RequestBody LoginRequestDTO loginRequest,
            HttpServletRequest request) {

        String ipAddress = getClientIpAddress(request);
        AuthResponseDTO response = authService.login(loginRequest, ipAddress);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Register new user", description = "Registers a new user (Admin only)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User registered successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CurrentUserDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request data or email already exists"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "403", description = "Forbidden - requires ADMIN role"),
            @ApiResponse(responseCode = "404", description = "Role not found")
    })
    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<CurrentUserDTO> register(
            @Parameter(description = "User registration data", required = true) @Valid @RequestBody RegisterRequestDTO registerRequest,
            HttpServletRequest request) {

        String ipAddress = getClientIpAddress(request);
        CurrentUserDTO response = authService.register(registerRequest, ipAddress);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Get current user", description = "Retrieves information about the currently authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Current user information retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CurrentUserDTO.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized - user not authenticated")
    })
    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<CurrentUserDTO> getCurrentUser() {
        CurrentUserDTO response = authService.getCurrentUser();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Check email availability", description = "Checks if an email address is already registered")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email availability checked"),
            @ApiResponse(responseCode = "400", description = "Invalid email format")
    })
    @GetMapping("/check-email")
    public ResponseEntity<EmailAvailabilityResponse> checkEmailAvailability(
            @Parameter(description = "Email address to check", required = true, example = "john.doe@zheslb.co.tz") @RequestParam String email) {

        boolean available = !authService.existsByEmail(email);
        return ResponseEntity.ok(new EmailAvailabilityResponse(available, email));
    }

    @Operation(summary = "Logout", description = "Logout the current user (JWT tokens are stateless, so this is mainly for audit logging)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logout successful"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/logout")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        // For JWT tokens, logout is mainly for audit purposes
        // In a production system, you might want to blacklist the token
        return ResponseEntity.ok("Logout successful");
    }

    /**
     * Extract client IP address from HTTP request
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }

        return request.getRemoteAddr();
    }

    // Inner class for email availability response
    @Schema(description = "Email availability check response")
    public record EmailAvailabilityResponse(
            @Schema(description = "Whether the email is available", example = "true") boolean available,
            @Schema(description = "The email that was checked", example = "john.doe@zheslb.co.tz") String email) {
    }
}
