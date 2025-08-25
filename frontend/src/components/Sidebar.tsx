import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  UserPlus,
  Shield,
  Database,
  Activity,
  LogOut,
  Plus,
  User,
  Calculator,
  TrendingUp,
  Target
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    if (!user) return [];
    
    switch (user.role.roleName) {
      case 'ADMIN':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: Users, label: 'User Management', href: '#users' },
          { icon: FileText, label: 'Loan Applications', href: '#applications' },
          { icon: BarChart3, label: 'Reports & Analytics', href: '#reports' },
          { icon: Settings, label: 'System Settings', href: '#settings' },
          { icon: Database, label: 'Data Management', href: '#data' },
          { icon: Shield, label: 'Role Management', href: '#roles' },
          { icon: Activity, label: 'Audit Logs', href: '#audit' }
        ];
      
      case 'HOD':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: Clock, label: 'Pending Review', href: '#pending' },
          { icon: FileText, label: 'All Applications', href: '#applications' },
          { icon: CheckCircle, label: 'Approved', href: '#approved' },
          { icon: XCircle, label: 'Rejected', href: '#rejected' },
          { icon: BarChart3, label: 'Department Stats', href: '#stats' }
        ];
      
      case 'MANAGER':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: Users, label: 'Team Management', href: '#team' },
          { icon: Clock, label: 'Pending Review', href: '#pending' },
          { icon: TrendingUp, label: 'Performance Metrics', href: '#metrics' },
          { icon: FileText, label: 'Operational Reports', href: '#reports' },
          { icon: Target, label: 'Planning & Strategy', href: '#strategy' }
        ];
      
      case 'ACCOUNTANT':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: DollarSign, label: 'Financial Review', href: '#financial' },
          { icon: Calculator, label: 'Loan Calculator', href: '#calculator' },
          { icon: FileText, label: 'Processed Loans', href: '#processed' },
          { icon: BarChart3, label: 'Financial Reports', href: '#reports' },
          { icon: Database, label: 'Payment Records', href: '#payments' }
        ];
      
      case 'AUDITOR':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: Shield, label: 'Compliance Monitoring', href: '#compliance' },
          { icon: Activity, label: 'Risk Assessment', href: '#risk' },
          { icon: FileText, label: 'Audit Reports', href: '#reports' },
          { icon: Database, label: 'Audit Findings', href: '#findings' },
          { icon: Target, label: 'Audit Planning', href: '#planning' }
        ];
      
      case 'CEO':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: FileText, label: 'Pending Approval', href: '#pending' },
          { icon: CheckCircle, label: 'Approved Loans', href: '#approved' },
          { icon: XCircle, label: 'Rejected Loans', href: '#rejected' },
          { icon: BarChart3, label: 'Organizational Analytics', href: '#analytics' },
          { icon: Shield, label: 'Compliance & Risk', href: '#compliance' }
        ];
      
      case 'CO':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: TrendingUp, label: 'Operations', href: '#operations' },
          { icon: Shield, label: 'Compliance', href: '#compliance' },
          { icon: Target, label: 'Strategy', href: '#strategy' },
          { icon: FileText, label: 'Reports', href: '#reports' },
          { icon: Users, label: 'Team', href: '#team' }
        ];
      
      case 'SECRETARY':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: FileText, label: 'Document Management', href: '#documents' },
          { icon: Clock, label: 'Scheduling', href: '#scheduling' },
          { icon: Users, label: 'Communication', href: '#communication' },
          { icon: Database, label: 'Records', href: '#records' },
          { icon: Settings, label: 'Administration', href: '#admin' }
        ];
      
      case 'STAFF':
        return [
          { icon: Home, label: 'Dashboard', href: '#dashboard' },
          { icon: FileText, label: 'My Applications', href: '#applications' },
          { icon: Plus, label: 'New Application', href: '#new' },
          { icon: Clock, label: 'Application Status', href: '#status' },
          { icon: User, label: 'My Profile', href: '#profile' },
          { icon: FileText, label: 'Documents', href: '#documents' }
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">ZHELSB</h2>
              <p className="text-xs text-gray-500">Loan System</p>
            </div>
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <Icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 