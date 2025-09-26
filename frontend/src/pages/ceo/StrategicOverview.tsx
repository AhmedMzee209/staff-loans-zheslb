import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Clock, XCircle, TrendingUp, Users, AlertTriangle, FileText } from 'lucide-react';
import { loanService } from '../../services/loanService';

interface LoanStats {
  totalApplications: number;
  pendingLoans: number;
  approvedLoans: number;
  rejectedLoans: number;
  totalAmount: number;
  pendingAmount: number;
  approvedAmount: number;
  averageProcessingTime: number;
}

const StrategicOverview: React.FC = () => {
  const [stats, setStats] = useState<LoanStats>({
    totalApplications: 0,
    pendingLoans: 0,
    approvedLoans: 0,
    rejectedLoans: 0,
    totalAmount: 0,
    pendingAmount: 0,
    approvedAmount: 0,
    averageProcessingTime: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const applications = await loanService.getAllApplications();
      
      const totalApplications = applications.length;
      const pendingLoans = applications.filter(app => 
        ['SUBMITTED', 'HOD_REVIEW', 'ACCOUNTANT_REVIEW', 'CEO_REVIEW', 'LEGAL_REVIEW'].includes(app.status)
      ).length;
      const approvedLoans = applications.filter(app => app.status === 'APPROVED').length;
      const rejectedLoans = applications.filter(app => app.status === 'REJECTED').length;
      
      const totalAmount = applications.reduce((sum, app) => sum + (app.amount || 0), 0);
      const pendingAmount = applications
        .filter(app => ['SUBMITTED', 'HOD_REVIEW', 'ACCOUNTANT_REVIEW', 'CEO_REVIEW', 'LEGAL_REVIEW'].includes(app.status))
        .reduce((sum, app) => sum + (app.amount || 0), 0);
      const approvedAmount = applications
        .filter(app => app.status === 'APPROVED')
        .reduce((sum, app) => sum + (app.amount || 0), 0);

      setStats({
        totalApplications,
        pendingLoans,
        approvedLoans,
        rejectedLoans,
        totalAmount,
        pendingAmount,
        approvedAmount,
        averageProcessingTime: 3.5
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="animate-pulse">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-lg shadow-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600 font-medium">Total Applications</p>
              <p className="text-3xl font-bold text-blue-900">{formatNumber(stats.totalApplications)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600">All time</span>
            <span className="text-blue-800 font-medium">
              {formatAmount(stats.totalAmount)}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm p-6 border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500 rounded-lg shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-yellow-600 font-medium">Pending Loans</p>
              <p className="text-3xl font-bold text-yellow-900">{formatNumber(stats.pendingLoans)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-yellow-600">Awaiting decision</span>
            <span className="text-yellow-800 font-medium">
              {formatAmount(stats.pendingAmount)}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-lg shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600 font-medium">Approved Loans</p>
              <p className="text-3xl font-bold text-green-900">{formatNumber(stats.approvedLoans)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">Successfully approved</span>
            <span className="text-green-800 font-medium">
              {formatAmount(stats.approvedAmount)}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm p-6 border border-red-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500 rounded-lg shadow-lg">
              <XCircle className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-red-600 font-medium">Rejected Loans</p>
              <p className="text-3xl font-bold text-red-900">{formatNumber(stats.rejectedLoans)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-600">Not approved</span>
            <span className="text-red-800 font-medium">
              {stats.totalApplications > 0 ? `${((stats.rejectedLoans / stats.totalApplications) * 100).toFixed(1)}%` : '0%'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Approval Rate</h3>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-emerald-600">
              {stats.totalApplications > 0 ? `${((stats.approvedLoans / stats.totalApplications) * 100).toFixed(1)}%` : '0%'}
            </p>
            <p className="text-sm text-gray-600 mt-2">Overall approval rate</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Avg. Processing</h3>
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">{stats.averageProcessingTime}</p>
            <p className="text-sm text-gray-600 mt-2">Days average</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Portfolio Health</h3>
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600">
              {stats.approvedAmount > 0 ? `${((stats.approvedAmount / 10000000) * 100).toFixed(1)}M` : '0M'}
            </p>
            <p className="text-sm text-gray-600 mt-2">TZS disbursed</p>
          </div>
        </div>
      </div>

      {/* Recent Pending Applications */}
      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Pending Applications</h3>
          <span className="text-sm text-gray-500">{stats.pendingLoans} applications</span>
        </div>
        
        <div className="space-y-3">
          {stats.pendingLoans > 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Recent pending applications will appear here</p>
              <p className="text-xs text-gray-400 mt-1">Go to Pending Approval tab to review applications</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No pending applications</p>
              <p className="text-xs text-gray-400 mt-1">All applications have been processed</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Review Pending ({stats.pendingLoans})</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-medium">View Approved</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="text-purple-700 font-medium">System Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategicOverview;
