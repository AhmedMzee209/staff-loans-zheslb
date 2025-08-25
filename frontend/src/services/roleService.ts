import apiService from './api';

export interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

export interface CreateRoleRequest {
  roleName: string;
  description: string;
}

// Backend DTO shape for /roles endpoints

interface BackendRoleResponseDTO {
  id: number;
  roleName: string;
  description: string;
}

// Map backend DTO to Role type
function mapBackendRole(dto: BackendRoleResponseDTO): Role {
  return {
    roleId: dto.id,
    roleName: dto.roleName,
    description: dto.description,
  };
}

class RoleService {
  // Get all roles
  async getAll(): Promise<Role[]> {
    const data = await apiService.get<BackendRoleResponseDTO[]>('/roles');
    return Array.isArray(data) ? data.map(mapBackendRole) : [];
  }

 
  // Create a new role
  async create(role: CreateRoleRequest): Promise<Role> {
    // Backend expects 'name' not 'roleName'
    const payload = {
      roleName: role.roleName,
      description: role.description,
    };
    const created = await apiService.post<BackendRoleResponseDTO>('/roles', payload);
    return mapBackendRole(created);
  }


  // Update Role
  async update(roleId: number, role: CreateRoleRequest): Promise<Role> {
    const payload = {
      roleName: role.roleName,
      description: role.description,
    };
    console.log('Updating role with payload:', payload, 'and roleId:', roleId);
    const updated = await apiService.put<BackendRoleResponseDTO>(`/roles/${roleId}`, payload);
    return mapBackendRole(updated);
  }

    // Delete Role
  async delete(roleId: number): Promise<void> {
    await apiService.delete(`/roles/${roleId}`);
  }

  
}

export const roleService = new RoleService();