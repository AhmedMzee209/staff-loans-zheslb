// User and Authentication Types
export interface User {
  userId: string;
  email: string;
  role: RoleInfo; // Legacy single role for backward compatibility
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  primaryRole?: RoleInfo;
  roles?: UserRoleDetails[];
}

export interface RoleInfo {
  roleId: string;
  roleName: string;
  description: string;
}

export interface UserRoleDetails {
  userRoleId: string;
  role: RoleInfo;
  assignedAt: string;
  assignedBy: string;
  assignedByEmail: string;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

// Loan Application Types
export interface LoanApplication {
  id: string;
  applicantId: string;
  amount: number;
  purpose: string;
  term: number;
  status: LoanStatus;
  submittedAt: string;
  updatedAt: string;
}

export interface LoanApplicationDetails {
  id: string;
  applicationId: string;
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

export interface Document {
  id: string;
  applicationId: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  status: DocumentStatus;
}

export interface Contract {
  id: string;
  applicationId: string;
  contractNumber: string;
  amount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number;
  status: ContractStatus;
  signedAt?: string;
  expiresAt: string;
}

export interface ApprovalStage {
  id: string;
  applicationId: string;
  stageType: StageType;
  status: StageStatus;
  approverId: string;
  approverRole: string;
  comments?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValues?: string;
  newValues?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export interface StaffProfile {
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

// Enums
export type LoanStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'COMPLETED' | 'CANCELLED';
export type DocumentType = 'NATIONAL_ID' | 'PAYSLIP' | 'BANK_STATEMENT' | 'EMPLOYMENT_LETTER' | 'OTHER';
export type DocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type ContractStatus = 'DRAFT' | 'PENDING_SIGNATURE' | 'SIGNED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type StageType = 'INITIAL_REVIEW' | 'HOD_APPROVAL' | 'MANAGER_APPROVAL' | 'ACCOUNTANT_REVIEW' | 'CEO_APPROVAL';
export type StageStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';

// Dashboard Types
export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  totalAmount: number;
  averageProcessingTime: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}

// Form Types
export interface LoanApplicationForm {
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

export interface ProfileUpdateForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
  path?: string;
}