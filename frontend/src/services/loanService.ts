import apiService from './api';
import type { LoanApplication, LoanApplicationDetails, Document, Contract, ApprovalStage, LoanStatus } from '../types';

export interface CreateLoanApplicationRequest {
  requestedAmount: number;
  loanPurpose: string;
  monthlyDeduction: number;
  deductionPeriod: number;
  staffId: string;
  status?: LoanStatus;
}

export interface UpdateLoanApplicationRequest extends Partial<CreateLoanApplicationRequest> {
  id: string;
}

class LoanService {
  // Get all loan applications for the current user with details
  async getMyApplications(): Promise<LoanApplication[]> {
    const raw = await apiService.get<any[]>('/loan-applications/getMyLoanApplicationsWithDetails');
    // Map backend DTO -> frontend LoanApplication shape
    return (raw || []).map((app: any) => {
      const details = app.details || {};
      const createdAt: string | undefined = app.createdAt;
      const updatedAt: string | undefined = app.updatedAt;
      return {
        id: app.applicationId ?? app.id ?? '',
        applicantId: app.staffId ?? app.applicantId ?? '',
        amount: Number(details.requestedAmount ?? app.amount ?? 0),
        purpose: details.loanPurpose ?? app.purpose ?? '',
        term: Number(details.deductionPeriod ?? app.term ?? 0),
        status: app.status ?? 'PENDING',
        submittedAt: createdAt ?? app.submittedAt ?? '',
        updatedAt: updatedAt ?? app.updatedAt ?? ''
      } as LoanApplication;
    });
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