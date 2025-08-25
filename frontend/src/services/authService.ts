import apiService from './api';
import { USER_ROLES, type UserRole, ROLE_DASHBOARDS } from '../constants/roles';
import type { User, LoginCredentials, AuthResponse } from '../types';

class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'currentUser';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting login with credentials:', { email: credentials.email });
      console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api');
      
      // The API service returns the raw response data
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      
      console.log('Login response received:', response);
      
      // Check if response has the expected structure
      if (response && response.accessToken && response.user) {
        console.log('Valid response structure, setting auth data');
        this.setToken(response.accessToken);
        this.setUser(response.user);
        return response;
      } else {
        console.error('Invalid response structure:', response);
        throw new Error('Invalid response format from server');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      await apiService.post('/auth/logout', {});
    } catch (error) {
      // Continue with local logout even if server call fails
      console.warn('Server logout failed, continuing with local logout');
    } finally {
      this.clearAuth();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiService.get<User>('/auth/me');
      if (response) {
        this.setUser(response);
        return response;
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiService.put<User>('/auth/profile', userData);
    if (response) {
      this.setUser(response);
    }
    return response;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiService.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  // Token management
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // User management
  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user: User): void {
    if (user && user.role && user.role.roleName) {
      user.role.roleName = user.role.roleName.trim().toUpperCase();
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: UserRole): boolean {
    const user = this.getUser();
    return user?.role.roleName === role;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getUser();
    return user ? roles.includes(user.role.roleName as UserRole) : false;
  }

  getCurrentUserRole(): UserRole | null {
    const user = this.getUser();
    return user ? (user.role.roleName as UserRole) : null;
  }

  getDashboardPath(): string {
    const role = this.getCurrentUserRole();
    return role ? ROLE_DASHBOARDS[role] : '/login';
  }

  // Role checking methods
  isAdmin(): boolean {
    return this.hasRole(USER_ROLES.ADMIN);
  }

  isStaff(): boolean {
    return this.hasRole(USER_ROLES.STAFF);
  }

  isHOD(): boolean {
    return this.hasRole(USER_ROLES.HOD);
  }

  isManager(): boolean {
    return this.hasRole(USER_ROLES.MANAGER);
  }

  isAccountant(): boolean {
    return this.hasRole(USER_ROLES.ACCOUNTANT);
  }

  isAuditor(): boolean {
    return this.hasRole(USER_ROLES.AUDITOR);
  }

  isCEO(): boolean {
    return this.hasRole(USER_ROLES.CEO);
  }

  isCO(): boolean {
    return this.hasRole(USER_ROLES.CO);
  }

  isSecretary(): boolean {
    return this.hasRole(USER_ROLES.SECRETARY);
  }
}

export const authService = new AuthService();
export default authService; 