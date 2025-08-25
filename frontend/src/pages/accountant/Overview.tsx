import React from 'react';
import { CheckCircle, XCircle, Calculator, DollarSign } from 'lucide-react';

const AccountantOverview: React.FC = () => {
  // Placeholder data - will be replaced with real API calls
  const placeholderApplications: any[] = [];
  const pendingReview = placeholderApplications.filter(app => app.status === 'ACCOUNTANT_REVIEW');
  const processedApplications = placeholderApplications.filter(app => ['APPROVED', 'REJECTED'].includes(app.status));
  const approvedApplications = placeholderApplications.filter(app => app.status === 'APPROVED');

  const totalApprovedAmount = approvedApplications.reduce((sum, app) => {
    return sum + (app.amount || 0);
  }, 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingReview.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Approved</p>
              <p className="text-lg font-bold text-gray-900">{formatAmount(totalApprovedAmount)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedApplications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {processedApplications.filter(app => app.status === 'REJECTED').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {formatAmount(totalApprovedAmount)}
            </div>
            <p className="text-sm text-gray-600">Total Loans Disbursed</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {approvedApplications.length}
            </div>
            <p className="text-sm text-gray-600">Active Loans</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-2">
              {formatAmount(approvedApplications.reduce((sum, app) => {
                return sum + (app.monthlyDeduction || 0);
              }, 0))}
            </div>
            <p className="text-sm text-gray-600">Monthly Collections</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Financial Activity</h3>
        <div className="space-y-4">
          {processedApplications.length === 0 ? (
            <div className="text-center py-8">
              <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent financial activity</p>
              <p className="text-sm text-gray-500 mt-2">Connect to backend to view real data</p>
            </div>
          ) : (
            processedApplications.slice(0, 5).map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    application.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {application.staff_member?.full_name || 'Staff Member'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {application.staff_member?.department || 'Department'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatAmount(application.amount || 0)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(application.updated_at || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountantOverview;
