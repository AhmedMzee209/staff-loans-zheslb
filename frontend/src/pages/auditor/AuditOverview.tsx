
import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Target } from 'lucide-react';

const AuditOverview: React.FC = () => {
  // Placeholder data - will be replaced with real API calls
  const placeholderApplications: any[] = [];
  const applicationsForAudit = placeholderApplications.filter(app =>
    app.status === 'APPROVED' || app.status === 'REJECTED'
  );
  const highRiskApplications = placeholderApplications.filter(app =>
    app.amount > 5000000 || app.status === 'REJECTED'
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
      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Compliance Score</p>
              <p className="text-2xl font-bold text-gray-900">87%</p>
              <p className="text-xs text-green-600">+5% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Compliant Loans</p>
              <p className="text-2xl font-bold text-gray-900">
                {applicationsForAudit.filter(() => Math.random() > 0.2).length}
              </p>
              <p className="text-xs text-green-600">Good compliance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">{highRiskApplications.length}</p>
              <p className="text-xs text-yellow-600">Needs attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Audit Coverage</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-xs text-green-600">Above target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">87%</div>
            <p className="text-sm text-gray-600">Overall Compliance</p>
            <p className="text-xs text-gray-500">Regulatory standards</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">94%</div>
            <p className="text-sm text-gray-600">Documentation</p>
            <p className="text-xs text-gray-500">Complete files</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">78%</div>
            <p className="text-sm text-gray-600">Process Adherence</p>
            <p className="text-xs text-gray-500">Standard procedures</p>
          </div>
        </div>
      </div>

      {/* Recent Audit Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Audit Activity</h3>
        <div className="space-y-4">
          {applicationsForAudit.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent audit activity</p>
              <p className="text-sm text-gray-500 mt-2">Connect to backend to view real data</p>
            </div>
          ) : (
            applicationsForAudit.slice(0, 5).map((application) => (
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
                    {application.status || 'PENDING'}
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

export default AuditOverview;
