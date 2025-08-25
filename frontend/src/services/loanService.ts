import apiService from './api';
import type { LoanApplication, LoanApplicationDetails, Document, Contract, ApprovalStage } from '../types';

export interface CreateLoanApplicationRequest {
  amount: number;
  purpose: string;
  term: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  employmentType: string;
  employerName: string;
  employmentDuration: number;
  collateral: string;
  guarantorName: string;
  guarantorPhone: string;
  guarantorRelationship: string;
}

export interface UpdateLoanApplicationRequest extends Partial<CreateLoanApplicationRequest> {
  id: string;
}

class LoanService {
  // Get all loan applications for the current user
  async getMyApplications(): Promise<LoanApplication[]> {
    return apiService.get<LoanApplication[]>('/loan-applications/my');
  }

  // Get all loan applications (for admin/manager roles)
  async getAllApplications(): Promise<LoanApplication[]> {
    return apiService.get<LoanApplication[]>('/loan-applications');
  }

  // Get loan application by ID
  async getApplicationById(id: string): Promise<LoanApplication> {
    return apiService.get<LoanApplication>(`/loan-applications/${id}`);
  }

  // Get loan application details
  async getApplicationDetails(applicationId: string): Promise<LoanApplicationDetails> {
    return apiService.get<LoanApplicationDetails>(`/loan-applications/${applicationId}/details`);
  }

  // Create new loan application
  async createApplication(data: CreateLoanApplicationRequest): Promise<LoanApplication> {
    return apiService.post<LoanApplication>('/loan-applications', data);
  }

  // Update loan application
  async updateApplication(data: UpdateLoanApplicationRequest): Promise<LoanApplication> {
    return apiService.put<LoanApplication>(`/loan-applications/${data.id}`, data);
  }

  // Delete loan application
  async deleteApplication(id: string): Promise<void> {
    return apiService.delete<void>(`/loan-applications/${id}`);
  }

  // Get documents for an application
  async getApplicationDocuments(applicationId: string): Promise<Document[]> {
    return apiService.get<Document[]>(`/loan-applications/${applicationId}/documents`);
  }

  // Upload document
  async uploadDocument(applicationId: string, file: File, type: string): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    return apiService.upload<Document>(`/loan-applications/${applicationId}/documents`, formData);
  }

  // Get approval stages for an application
  async getApprovalStages(applicationId: string): Promise<ApprovalStage[]> {
    return apiService.get<ApprovalStage[]>(`/loan-applications/${applicationId}/approval-stages`);
  }

  // Approve/reject application (for approvers)
  async updateApprovalStage(
    applicationId: string, 
    stageId: string, 
    status: 'APPROVED' | 'REJECTED', 
    comments?: string
  ): Promise<ApprovalStage> {
    return apiService.put<ApprovalStage>(`/loan-applications/${applicationId}/approval-stages/${stageId}`, {
      status,
      comments
    });
  }

  // Get contracts for an application
  async getApplicationContracts(applicationId: string): Promise<Contract[]> {
    return apiService.get<Contract[]>(`/loan-applications/${applicationId}/contracts`);
  }

  // Create contract
  async createContract(applicationId: string, contractData: Partial<Contract>): Promise<Contract> {
    return apiService.post<Contract>(`/loan-applications/${applicationId}/contracts`, contractData);
  }

  // Get dashboard statistics
  async getDashboardStats(): Promise<{
    totalApplications: number;
    pendingApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    totalAmount: number;
    averageProcessingTime: number;
  }> {
    return apiService.get('/loan-applications/dashboard-stats');
  }

  // Get applications by status
  async getApplicationsByStatus(status: string): Promise<LoanApplication[]> {
    return apiService.get<LoanApplication[]>(`/loan-applications/status/${status}`);
  }

  // Get applications by department (for HOD)
  async getApplicationsByDepartment(department: string): Promise<LoanApplication[]> {
    return apiService.get<LoanApplication[]>(`/loan-applications/department/${department}`);
  }
}

export const loanService = new LoanService();
export default loanService; 