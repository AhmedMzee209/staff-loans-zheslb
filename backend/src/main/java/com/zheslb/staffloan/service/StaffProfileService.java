
package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.StaffProfileDto;
import com.zheslb.staffloan.model.StaffProfile;
import com.zheslb.staffloan.model.User;
import com.zheslb.staffloan.repository.StaffProfileRepository;
import com.zheslb.staffloan.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffProfileService {

    // Update only the profile image
    public void updateProfileImage(UUID profileId, String fileName) {
        StaffProfile profile = staffProfileRepository.findById(profileId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found"));
        profile.setProfileImage(fileName);
        staffProfileRepository.save(profile);
    }

    private final StaffProfileRepository staffProfileRepository;
    private final UserRepository userRepository;

    // Get by user ID
    public StaffProfileDto getProfileByUserId(UUID userId) {
        StaffProfile profile = staffProfileRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found"));
        return mapEntityToDto(profile);
    }

    // Create StaffProfile
    public StaffProfileDto createProfile(StaffProfileDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (staffProfileRepository.existsByUser(user)) {
            throw new IllegalStateException("Staff profile already exists for this user");
        }

        StaffProfile profile = new StaffProfile();
        mapDtoToEntity(dto, profile, user);
        StaffProfile saved = staffProfileRepository.save(profile);
        return mapEntityToDto(saved);
    }

    // Get all staff profiles
    public List<StaffProfileDto> getAllProfiles() {
        return staffProfileRepository.findAll()
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    // Get by profile ID
    public StaffProfileDto getProfileById(UUID profileId) {
        StaffProfile profile = staffProfileRepository.findById(profileId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found"));
        return mapEntityToDto(profile);
    }

    // Update
    public StaffProfileDto updateProfile(UUID profileId, StaffProfileDto dto) {
        StaffProfile profile = staffProfileRepository.findById(profileId)
                .orElseThrow(() -> new EntityNotFoundException("Profile not found"));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        mapDtoToEntity(dto, profile, user);
        StaffProfile updated = staffProfileRepository.save(profile);
        return mapEntityToDto(updated);
    }

    // Delete
    public void deleteProfile(UUID profileId) {
        if (!staffProfileRepository.existsById(profileId)) {
            throw new EntityNotFoundException("Profile not found");
        }
        staffProfileRepository.deleteById(profileId);
    }

    // =======================
    // 🔁 Mapping Methods
    // =======================

    private StaffProfileDto mapEntityToDto(StaffProfile profile) {
        StaffProfileDto dto = new StaffProfileDto();
        dto.setProfileId(profile.getProfileId());
        dto.setUserId(profile.getUser().getUserId());
        dto.setFirstName(profile.getFirstName());
        dto.setLastName(profile.getLastName());
        dto.setDepartment(profile.getDepartment());
        dto.setPosition(profile.getPosition());
        dto.setZanzibarId(profile.getZanzibarId());
        dto.setSalaryNumber(profile.getSalaryNumber());
        dto.setZssfNumber(profile.getZssfNumber());
        dto.setProfileImage(profile.getProfileImage());
        return dto;
    }

    private void mapDtoToEntity(StaffProfileDto dto, StaffProfile profile, User user) {
        profile.setUser(user);
        profile.setFirstName(dto.getFirstName());
        profile.setLastName(dto.getLastName());
        profile.setDepartment(dto.getDepartment());
        profile.setPosition(dto.getPosition());
        profile.setZanzibarId(dto.getZanzibarId());
        profile.setSalaryNumber(dto.getSalaryNumber());
        profile.setZssfNumber(dto.getZssfNumber());
        profile.setProfileImage(dto.getProfileImage());
    }
}
