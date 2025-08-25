package com.zheslb.staffloan.service;

import com.zheslb.staffloan.dto.RoleRequestDTO;
import com.zheslb.staffloan.dto.RoleResponseDTO;
import com.zheslb.staffloan.model.Role;
import com.zheslb.staffloan.repository.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public RoleResponseDTO createRole(RoleRequestDTO dto) {
        Role role = new Role();
        role.setRoleName(dto.getRoleName());
        role.setDescription(dto.getDescription());
        Role saved = roleRepository.save(role);
        return new RoleResponseDTO(saved.getRoleId(), saved.getRoleName(), saved.getDescription());
    }

    public List<RoleResponseDTO> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(role -> new RoleResponseDTO(role.getRoleId(), role.getRoleName(), role.getDescription()))
                .collect(Collectors.toList());
    }

    public RoleResponseDTO getRoleById(UUID id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return new RoleResponseDTO(role.getRoleId(), role.getRoleName(), role.getDescription());
    }

    public RoleResponseDTO updateRole(UUID id, RoleRequestDTO dto) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        role.setRoleName(dto.getRoleName());
        role.setDescription(dto.getDescription());
        Role updated = roleRepository.save(role);
        return new RoleResponseDTO(updated.getRoleId(), updated.getRoleName(), updated.getDescription());
    }

    public void deleteRole(UUID id) {
        roleRepository.deleteById(id);
    }
}
