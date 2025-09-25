import apiService from './api';
import type { UserRoleDetails, RoleInfo } from '../types';

export interface UserWithRoles {
  userId: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  primaryRole?: RoleInfo;
  roles: UserRoleDetails[];
}

export interface UserRoleAssignmentRequest {
  userId: string;
  roleIds: string[];
  primaryRoleId?: string;
}

export interface RoleAssignmentResponse {
  userId: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  primaryRole?: RoleInfo;
  roles: UserRoleDetails[];
}

// Backend DTO mapping helpers
function mapBackendUserWithRoles(dto: any): UserWithRoles {
  return {
    userId: dto.userId,
    email: dto.email,
    isActive: dto.isActive,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    primaryRole: dto.primaryRole ? {
      roleId: dto.primaryRole.roleId,
      roleName: dto.primaryRole.roleName,
      description: dto.primaryRole.description
    } : undefined,
    roles: dto.roles?.map((roleDetail: any) => ({
      userRoleId: roleDetail.userRoleId,
      role: {
        roleId: roleDetail.role.roleId,
        roleName: roleDetail.role.roleName,
        description: roleDetail.role.description
      },
      assignedAt: roleDetail.assignedAt,
      assignedBy: roleDetail.assignedBy,
      assignedByEmail: roleDetail.assignedByEmail,
      isActive: roleDetail.isActive
    })) || []
  };
}

class UserRoleService {
  private readonly BASE_PATH = '/admin/role-management';

  // Get all users with their roles
  async getAllUsersWithRoles(): Promise<UserWithRoles[]> {
    const data = await apiService.get<any[]>(`${this.BASE_PATH}/users`);
    return Array.isArray(data) ? data.map(mapBackendUserWithRoles) : [];
  }

  // Get specific user with roles
  async getUserWithRoles(userId: string): Promise<UserWithRoles> {
    const data = await apiService.get<any>(`${this.BASE_PATH}/users/${userId}`);
    return mapBackendUserWithRoles(data);
  }

  // Assign multiple roles to user (replaces existing roles)
  async assignRolesToUser(assignment: UserRoleAssignmentRequest): Promise<UserWithRoles> {
    const payload = {
      userId: assignment.userId,
      roleIds: assignment.roleIds,
      primaryRoleId: assignment.primaryRoleId
    };
    const data = await apiService.post<any>(`${this.BASE_PATH}/assign-roles`, payload);
    return mapBackendUserWithRoles(data);
  }

  // Add single role to user (keeps existing roles)
  async addRoleToUser(userId: string, roleId: string): Promise<UserWithRoles> {
    const data = await apiService.post<any>(`${this.BASE_PATH}/users/${userId}/roles/${roleId}`, {});
    return mapBackendUserWithRoles(data);
  }

  // Remove specific role from user
  async removeRoleFromUser(userId: string, roleId: string): Promise<UserWithRoles> {
    const data = await apiService.delete<any>(`${this.BASE_PATH}/users/${userId}/roles/${roleId}`);
    return mapBackendUserWithRoles(data);
  }

  // Set primary role for user
  async setPrimaryRole(userId: string, roleId: string): Promise<UserWithRoles> {
    const data = await apiService.put<any>(`${this.BASE_PATH}/users/${userId}/primary-role/${roleId}`, {});
    return mapBackendUserWithRoles(data);
  }

  // Get all available roles
  async getAllRoles(): Promise<RoleInfo[]> {
    const data = await apiService.get<any[]>(`${this.BASE_PATH}/roles`);
    return Array.isArray(data) ? data.map((role: any) => ({
      roleId: role.roleId,
      roleName: role.roleName,
      description: role.description
    })) : [];
  }

  // Get users by role
  async getUsersByRole(roleName: string): Promise<UserWithRoles[]> {
    const data = await apiService.get<any[]>(`${this.BASE_PATH}/roles/${roleName}/users`);
    return Array.isArray(data) ? data.map(mapBackendUserWithRoles) : [];
  }

  // Helper method to check if user has specific role
  hasRole(user: UserWithRoles, roleName: string): boolean {
    return user.roles.some(roleDetail => 
      roleDetail.role.roleName === roleName && roleDetail.isActive
    );
  }

  // Helper method to check if user has any of the specified roles
  hasAnyRole(user: UserWithRoles, roleNames: string[]): boolean {
    return user.roles.some(roleDetail => 
      roleNames.includes(roleDetail.role.roleName) && roleDetail.isActive
    );
  }

  // Helper method to get all active role names for a user
  getActiveRoleNames(user: UserWithRoles): string[] {
    return user.roles
      .filter(roleDetail => roleDetail.isActive)
      .map(roleDetail => roleDetail.role.roleName);
  }

  // Helper method to ensure user has STAFF role (for default assignment)
  async ensureStaffRole(userId: string): Promise<UserWithRoles> {
    try {
      const user = await this.getUserWithRoles(userId);
      
      // Check if user already has STAFF role
      if (this.hasRole(user, 'STAFF')) {
        return user;
      }

      // Get all roles to find STAFF role ID
      const allRoles = await this.getAllRoles();
      const staffRole = allRoles.find(role => role.roleName === 'STAFF');
      
      if (!staffRole) {
        throw new Error('STAFF role not found in system');
      }

      // Add STAFF role to user
      return await this.addRoleToUser(userId, staffRole.roleId);
    } catch (error) {
      console.error('Error ensuring STAFF role:', error);
      throw error;
    }
  }
}

export const userRoleService = new UserRoleService();