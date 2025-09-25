import apiService from './api';
import { USER_ROLES, type UserRole, ROLE_DASHBOARDS, ROLE_DISPLAY_NAMES } from '../constants/roles';
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
    // Normalize legacy role name for backward compatibility
    if (user && user.role && user.role.roleName) {
      user.role.roleName = user.role.roleName.trim().toUpperCase();
    }
    
    // Normalize primary role name if exists
    if (user && user.primaryRole && user.primaryRole.roleName) {
      user.primaryRole.roleName = user.primaryRole.roleName.trim().toUpperCase();
    }
    
    // Normalize all role names in the roles array
    if (user && user.roles) {
      user.roles.forEach(roleDetail => {
        if (roleDetail.role && roleDetail.role.roleName) {
          roleDetail.role.roleName = roleDetail.role.roleName.trim().toUpperCase();
        }
      });
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
    if (!user) return false;
    
    // Check in multiple roles if available
    if (user.roles && user.roles.length > 0) {
      return user.roles.some(roleDetail => 
        roleDetail.role.roleName === role && roleDetail.isActive
      );
    }
    
    // Fallback to legacy single role
    return user.role?.roleName === role;
  }

  hasAnyRole(roles: UserRole[]): boolean {
    const user = this.getUser();
    if (!user) return false;
    
    // Check in multiple roles if available
    if (user.roles && user.roles.length > 0) {
      return user.roles.some(roleDetail => 
        roles.includes(roleDetail.role.roleName as UserRole) && roleDetail.isActive
      );
    }
    
    // Fallback to legacy single role
    return user.role ? roles.includes(user.role.roleName as UserRole) : false;
  }

  getCurrentUserRole(): UserRole | null {
    const user = this.getUser();
    if (!user) return null;
    
    // Return primary role if available
    if (user.primaryRole) {
      return user.primaryRole.roleName as UserRole;
    }
    
    // Fallback to legacy single role
    return user.role ? (user.role.roleName as UserRole) : null;
  }

  // Get all active roles for the current user
  getCurrentUserRoles(): UserRole[] {
    const user = this.getUser();
    if (!user) return [];
    
    if (user.roles && user.roles.length > 0) {
      return user.roles
        .filter(roleDetail => roleDetail.isActive)
        .map(roleDetail => roleDetail.role.roleName as UserRole);
    }
    
    // Fallback to legacy single role
    return user.role ? [user.role.roleName as UserRole] : [];
  }

  // Get primary role, with fallback to first active role
  getPrimaryRole(): UserRole | null {
    const user = this.getUser();
    if (!user) return null;
    
    // Return primary role if set
    if (user.primaryRole) {
      return user.primaryRole.roleName as UserRole;
    }
    
    // Fallback to first active role
    if (user.roles && user.roles.length > 0) {
      const firstActiveRole = user.roles.find(roleDetail => roleDetail.isActive);
      if (firstActiveRole) {
        return firstActiveRole.role.roleName as UserRole;
      }
    }
    
    // Fallback to legacy single role
    return user.role ? (user.role.roleName as UserRole) : null;
  }

  getDashboardPath(): string {
    const role = this.getPrimaryRole();
    return role ? ROLE_DASHBOARDS[role] : '/login';
  }

  // Get unified dashboard path (for backward compatibility)
  getUnifiedDashboardPath(): string {
    return '/dashboard';
  }

  // Get all accessible dashboard paths based on user's roles
  getAccessibleDashboards(): Array<{ role: UserRole; path: string; displayName: string }> {
    const roles = this.getCurrentUserRoles();
    return roles.map(role => ({
      role,
      path: ROLE_DASHBOARDS[role],
      displayName: ROLE_DISPLAY_NAMES[role] || role
    }));
  }

  // Role checking methods (updated for multi-role support)
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

  // Enhanced role checking - check if user has management roles
  hasManagementRole(): boolean {
    return this.hasAnyRole([
      USER_ROLES.ADMIN,
      USER_ROLES.CEO,
      USER_ROLES.HOD,
      USER_ROLES.MANAGER,
      USER_ROLES.CO
    ]);
  }

  // Check if user has financial roles
  hasFinancialRole(): boolean {
    return this.hasAnyRole([
      USER_ROLES.ACCOUNTANT,
      USER_ROLES.AUDITOR,
      USER_ROLES.CEO,
      USER_ROLES.CO
    ]);
  }

  // Check if user can apply for loans (all users with STAFF role can)
  canApplyForLoans(): boolean {
    return this.isStaff();
  }

  // Check if user can approve loans
  canApproveLoans(): boolean {
    return this.hasAnyRole([
      USER_ROLES.HOD,
      USER_ROLES.MANAGER,
      USER_ROLES.CEO,
      USER_ROLES.CO
    ]);
  }
}

export const authService = new AuthService();
export default authService; 