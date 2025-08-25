
import React from 'react';

const ComplianceRisk: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Compliance & Risk Management</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Risk Assessment</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Portfolio Risk</span>
              <span className="text-sm font-medium text-green-600">Low</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm text-gray-700">Compliance Score</span>
              <span className="text-sm font-medium text-yellow-600">85%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">Audit Status</span>
              <span className="text-sm font-medium text-green-600">Clean</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Compliance Alerts</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Monthly Report Due</p>
              <p className="text-xs text-blue-600">Due in 3 days</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Audit Completed</p>
              <p className="text-xs text-green-600">No issues found</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceRisk;
