import apiService from './api';
import type { User } from '../types';

export interface CreateUserRequest {
  email: string;
  password: string;
  roleId: string; // UUID from backend
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  address: string;
  department: string;
  position: string;
  employmentDate: string;
  salary: number;
  emergencyContact: string;
  emergencyPhone: string;
}

// Backend DTO shape for /users endpoints
interface BackendUserResponseDTO {
  id: string;
  email: string;
  roleName: string;
  isActive: boolean;
}

function mapBackendUser(dto: BackendUserResponseDTO): User {
  return {
    userId: dto.id,
    email: dto.email,
    role: {
      roleId: '',
      roleName: dto.roleName ? dto.roleName.toUpperCase() : '',
      description: ''
    },
    isActive: dto.isActive,
    createdAt: new Date().toISOString()
  };
}

class UserService {
  // Get all users (admin only)
  async getAllUsers(): Promise<User[]> {
    const data = await apiService.get<BackendUserResponseDTO[]>('/users');
    return Array.isArray(data) ? data.map(mapBackendUser) : [];
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const data = await apiService.get<BackendUserResponseDTO>(`/users/${id}`);
    return mapBackendUser(data);
  }

  // Create new user (admin only)
  async createUser(data: CreateUserRequest): Promise<User> {
    // Only send the required fields to backend
    const payload = {
      email: data.email,
      password: data.password,
      roleId: data.roleId
    };
    const created = await apiService.post<BackendUserResponseDTO>('/users', payload);
    return mapBackendUser(created);
  }

  // Update user
  async updateUser(data: UpdateUserRequest): Promise<User> {
    const updated = await apiService.put<BackendUserResponseDTO>(`/users/${data.id}`, data);
    return mapBackendUser(updated);
  }

  // Delete user (admin only)
  async deleteUser(id: string): Promise<void> {
    return apiService.delete<void>(`/users/${id}`);
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile> {
    return apiService.get<UserProfile>(`/users/${userId}/profile`);
  }

  // Update user profile
  async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile> {
    return apiService.put<UserProfile>(`/users/${userId}/profile`, profileData);
  }

  // Get users by role
  async getUsersByRole(roleName: string): Promise<User[]> {
    const data = await apiService.get<BackendUserResponseDTO[]>(`/users/role/${roleName}`);
    return Array.isArray(data) ? data.map(mapBackendUser) : [];
  }

  // Get users by department
  async getUsersByDepartment(department: string): Promise<User[]> {
    const data = await apiService.get<BackendUserResponseDTO[]>(`/users/department/${department}`);
    return Array.isArray(data) ? data.map(mapBackendUser) : [];
  }

  // Activate/deactivate user
  async toggleUserStatus(userId: string, isActive: boolean): Promise<User> {
    const updated = await apiService.put<BackendUserResponseDTO>(`/users/${userId}/status`, { isActive });
    return mapBackendUser(updated);
  }

  // Change user password
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    return apiService.post<void>(`/users/${userId}/change-password`, {
      currentPassword,
      newPassword
    });
  }

  // Reset user password (admin only)
  async resetPassword(userId: string, newPassword: string): Promise<void> {
    return apiService.post<void>(`/users/${userId}/reset-password`, {
      newPassword
    });
  }

  // Get user statistics
  async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    usersByRole: Record<string, number>;
    usersByDepartment: Record<string, number>;
  }> {
    return apiService.get('/users/stats');
  }
}

export const userService = new UserService();
export default userService; 