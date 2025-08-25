export const LOAN_STATUS = {
  PENDING: 'PENDING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  DISBURSED: 'DISBURSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;

export type LoanStatus = typeof LOAN_STATUS[keyof typeof LOAN_STATUS];

export const STATUS_DISPLAY_NAMES: Record<LoanStatus, string> = {
  [LOAN_STATUS.PENDING]: 'Pending',
  [LOAN_STATUS.UNDER_REVIEW]: 'Under Review',
  [LOAN_STATUS.APPROVED]: 'Approved',
  [LOAN_STATUS.REJECTED]: 'Rejected',
  [LOAN_STATUS.DISBURSED]: 'Disbursed',
  [LOAN_STATUS.COMPLETED]: 'Completed',
  [LOAN_STATUS.CANCELLED]: 'Cancelled'
};

export const STATUS_COLORS: Record<LoanStatus, string> = {
  [LOAN_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [LOAN_STATUS.UNDER_REVIEW]: 'bg-blue-100 text-blue-800',
  [LOAN_STATUS.APPROVED]: 'bg-green-100 text-green-800',
  [LOAN_STATUS.REJECTED]: 'bg-red-100 text-red-800',
  [LOAN_STATUS.DISBURSED]: 'bg-purple-100 text-purple-800',
  [LOAN_STATUS.COMPLETED]: 'bg-gray-100 text-gray-800',
  [LOAN_STATUS.CANCELLED]: 'bg-red-100 text-red-800'
};

export const STATUS_ICONS: Record<LoanStatus, string> = {
  [LOAN_STATUS.PENDING]: '⏳',
  [LOAN_STATUS.UNDER_REVIEW]: '🔍',
  [LOAN_STATUS.APPROVED]: '✅',
  [LOAN_STATUS.REJECTED]: '❌',
  [LOAN_STATUS.DISBURSED]: '💰',
  [LOAN_STATUS.COMPLETED]: '🎯',
  [LOAN_STATUS.CANCELLED]: '🚫'
}; 