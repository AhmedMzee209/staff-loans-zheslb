package com.zheslb.staffloan.controller;

import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import com.zheslb.staffloan.dto.StaffProfileDto;
import com.zheslb.staffloan.service.StaffProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/staff-profiles")
@RequiredArgsConstructor
@Tag(name = "Staff Profile Management", description = "APIs for managing staff profiles in the loan system")
public class StaffProfileController {

        private static final Logger logger = LoggerFactory.getLogger(StaffProfileController.class);

        // Profile image upload endpoint
        @PostMapping(value = "/{id}/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
        public ResponseEntity<String> uploadProfileImage(
                        @PathVariable UUID id,
                        @RequestParam("file") MultipartFile file) throws IOException {
                logger.info("Received image upload for profile ID: {}", id);
                // Validate file type
                String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
                if (ext == null || !ext.equalsIgnoreCase("jpg")) {
                        logger.warn("Rejected upload: not a JPG file");
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only JPG images are allowed.");
                }
                // Validate image dimensions
                BufferedImage img = ImageIO.read(file.getInputStream());
                if (img == null || img.getWidth() != 120 || img.getHeight() != 150) {
                        logger.warn("Rejected upload: invalid image dimensions {}x{}",
                                        img != null ? img.getWidth() : -1, img != null ? img.getHeight() : -1);
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Image must be 120x150 pixels.");
                }
                // Save file
                String fileName = "profile_" + id + ".jpg";
                String uploadDir = "/home/anonymous/DEV/zheslb_loans/backend/uploads/profile-images/";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                        dir.mkdirs();
                }
                File dest = new File(uploadDir + fileName);
                logger.info("Saving image to {}", dest.getAbsolutePath());
                file.transferTo(dest);
                logger.info("Image saved successfully");
                // Update profile entity
                staffProfileService.updateProfileImage(id, fileName);
                return ResponseEntity.ok(fileName);
        }

        private final StaffProfileService staffProfileService;

        @Operation(summary = "Get staff profile by user ID", description = "Retrieves a staff profile by the associated user's unique identifier")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Staff profile found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffProfileDto.class))),
                        @ApiResponse(responseCode = "404", description = "Staff profile not found")
        })
        @GetMapping("/user/{userId}")
        public ResponseEntity<StaffProfileDto> getProfileByUserId(
                        @Parameter(description = "User ID", required = true, example = "456e7890-e12c-34d5-b678-542715286341") @PathVariable UUID userId) {
                return ResponseEntity.ok(staffProfileService.getProfileByUserId(userId));
        }

        @Operation(summary = "Create a new staff profile", description = "Creates a new staff profile with the provided details. Requires STAFF or ADMIN role.", security = @SecurityRequirement(name = "bearerAuth"))
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Staff profile created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffProfileDto.class))),
                        @ApiResponse(responseCode = "400", description = "Invalid input data"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized"),
                        @ApiResponse(responseCode = "403", description = "Forbidden - insufficient permissions"),
                        @ApiResponse(responseCode = "409", description = "Staff profile already exists for this user")
        })
        @PostMapping
        @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
        public ResponseEntity<StaffProfileDto> createProfile(
                        @Parameter(description = "Staff profile data to create", required = true) @Valid @RequestBody StaffProfileDto dto) {
                return ResponseEntity.ok(staffProfileService.createProfile(dto));
        }

        @Operation(summary = "Update staff profile", description = "Updates an existing staff profile with the provided details. Requires STAFF or ADMIN role.", security = @SecurityRequirement(name = "bearerAuth"))
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Staff profile updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffProfileDto.class))),
                        @ApiResponse(responseCode = "400", description = "Invalid input data"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized"),
                        @ApiResponse(responseCode = "403", description = "Forbidden - insufficient permissions"),
                        @ApiResponse(responseCode = "404", description = "Staff profile not found")
        })
        @PutMapping("/{id}")
        @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
        public ResponseEntity<StaffProfileDto> updateProfile(
                        @Parameter(description = "Staff profile ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id,
                        @Parameter(description = "Updated staff profile data", required = true) @Valid @RequestBody StaffProfileDto dto) {
                return ResponseEntity.ok(staffProfileService.updateProfile(id, dto));
        }

        @Operation(summary = "Get staff profile by ID", description = "Retrieves a specific staff profile by its unique identifier")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Staff profile found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffProfileDto.class))),
                        @ApiResponse(responseCode = "404", description = "Staff profile not found")
        })
        @GetMapping("/{id}")
        public ResponseEntity<StaffProfileDto> getProfile(
                        @Parameter(description = "Staff profile ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id) {
                return ResponseEntity.ok(staffProfileService.getProfileById(id));
        }

        @Operation(summary = "Get all staff profiles", description = "Retrieves a list of all staff profiles in the system")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Staff profiles retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = StaffProfileDto.class)))
        })
        @GetMapping
        public ResponseEntity<List<StaffProfileDto>> getAllProfiles() {
                return ResponseEntity.ok(staffProfileService.getAllProfiles());
        }

        @Operation(summary = "Delete staff profile", description = "Deletes a staff profile from the system. Requires ADMIN role.", security = @SecurityRequirement(name = "bearerAuth"))
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Staff profile deleted successfully"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized"),
                        @ApiResponse(responseCode = "403", description = "Forbidden - requires ADMIN role"),
                        @ApiResponse(responseCode = "404", description = "Staff profile not found")
        })
        @DeleteMapping("/{id}")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<Void> deleteProfile(
                        @Parameter(description = "Staff profile ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000") @PathVariable UUID id) {
                staffProfileService.deleteProfile(id);
                return ResponseEntity.noContent().build();
        }
}
