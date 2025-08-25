
import React from 'react';
import { Award, DollarSign, CheckCircle, Clock } from 'lucide-react';

const StrategicOverview: React.FC = () => {
  // Placeholder data - will be replaced with real API calls
  const placeholderApplications: any[] = [];
  const approvedApplications = placeholderApplications.filter(app => app.status === 'APPROVED');
  const pendingCOApproval = placeholderApplications.filter(app =>
    app.status === 'CO_REVIEW' || app.status === 'ACCOUNTANT_REVIEW'
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Executive Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Loans</p>
              <p className="text-2xl font-bold text-gray-900">{placeholderApplications.length}</p>
              <p className="text-xs text-green-600">+12 this quarter</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Portfolio Value</p>
              <p className="text-lg font-bold text-gray-900">
                {formatAmount(approvedApplications.reduce((sum, app) => {
                  return sum + (app.amount || 0);
                }, 0))}
              </p>
              <p className="text-xs text-blue-600">Growing portfolio</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Approval Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {placeholderApplications.length > 0 ? 
                  Math.round((approvedApplications.length / placeholderApplications.length) * 100) : 0
                }%
              </p>
              <p className="text-xs text-green-600">High quality</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCOApproval.length}</p>
              <p className="text-xs text-yellow-600">Needs attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Strategic Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-2">85%</div>
            <p className="text-sm text-gray-600">Staff Satisfaction</p>
            <p className="text-xs text-gray-500">Loan program rating</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">92%</div>
            <p className="text-sm text-gray-600">Repayment Rate</p>
            <p className="text-xs text-gray-500">On-time payments</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">78%</div>
            <p className="text-sm text-gray-600">Risk Score</p>
            <p className="text-xs text-gray-500">Low risk portfolio</p>
          </div>
        </div>
      </div>

      {/* Recent Strategic Decisions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Strategic Decisions</h3>
        <div className="space-y-4">
          {approvedApplications.length === 0 ? (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent strategic decisions</p>
              <p className="text-sm text-gray-500 mt-2">Connect to backend to view real data</p>
            </div>
          ) : (
            approvedApplications.slice(0, 3).map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Approved loan for {application.staff_member?.full_name || 'Staff Member'}
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

export default StrategicOverview;
