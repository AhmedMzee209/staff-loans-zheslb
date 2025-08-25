// These roles should match exactly what's in the backend Role model
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  HOD: 'HOD',
  MANAGER: 'MANAGER',
  ACCOUNTANT: 'ACCOUNTANT',
  AUDITOR: 'AUDITOR',
  CEO: 'CEO',
  CO: 'CO', // Chief Officer
  SECRETARY: 'SECRETARY'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.STAFF]: 'Staff Member',
  [USER_ROLES.HOD]: 'Head of Department',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.ACCOUNTANT]: 'Accountant',
  [USER_ROLES.AUDITOR]: 'Auditor',
  [USER_ROLES.CEO]: 'Chief Executive Officer',
  [USER_ROLES.CO]: 'Chief Officer',
  [USER_ROLES.SECRETARY]: 'Secretary'
};

export const ROLE_COLORS: Record<UserRole, string> = {
  [USER_ROLES.ADMIN]: 'bg-red-100 text-red-800',
  [USER_ROLES.STAFF]: 'bg-blue-100 text-blue-800',
  [USER_ROLES.HOD]: 'bg-purple-100 text-purple-800',
  [USER_ROLES.MANAGER]: 'bg-indigo-100 text-indigo-800',
  [USER_ROLES.ACCOUNTANT]: 'bg-green-100 text-green-800',
  [USER_ROLES.AUDITOR]: 'bg-yellow-100 text-yellow-800',
  [USER_ROLES.CEO]: 'bg-gray-100 text-gray-800',
  [USER_ROLES.CO]: 'bg-orange-100 text-orange-800',
  [USER_ROLES.SECRETARY]: 'bg-pink-100 text-pink-800'
};

// Dashboard routing based on roles
export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  [USER_ROLES.ADMIN]: '/admin',
  [USER_ROLES.STAFF]: '/staff',
  [USER_ROLES.HOD]: '/hod',
  [USER_ROLES.MANAGER]: '/manager',
  [USER_ROLES.ACCOUNTANT]: '/accountant',
  [USER_ROLES.AUDITOR]: '/auditor',
  [USER_ROLES.CEO]: '/ceo',
  [USER_ROLES.CO]: '/co',
  [USER_ROLES.SECRETARY]: '/secretary'
}; 