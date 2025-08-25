
import React from 'react';

const AuditReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Audit Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Monthly Audit Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Loans Audited</span>
              <span className="text-sm font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Compliance Issues</span>
              <span className="text-sm font-medium text-yellow-600">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Risk Alerts</span>
              <span className="text-sm font-medium text-red-600">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Recommendations</span>
              <span className="text-sm font-medium text-blue-600">5</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Audit Findings</h4>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Documentation Gaps</p>
              <p className="text-xs text-yellow-600">3 cases identified</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm font-medium text-red-800">Process Deviation</p>
              <p className="text-xs text-red-600">1 critical issue</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Improvement Areas</p>
              <p className="text-xs text-blue-600">5 opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditReports;
