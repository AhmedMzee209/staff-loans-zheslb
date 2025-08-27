import apiService from '../services/api';

export interface AdminStats {
  totalUsers: number;
  newUsersThisMonth: number;
  totalApplications: number;
  newApplicationsThisMonth: number;
  pendingReviews: number;
  approvalRate: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  return apiService.get<AdminStats>('/admin/stats');
};
