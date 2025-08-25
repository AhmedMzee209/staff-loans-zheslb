
import React from 'react';

const OrganizationalAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Organizational Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Department Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Finance</span>
              <span className="text-sm font-medium text-green-600">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Human Resources</span>
              <span className="text-sm font-medium text-green-600">88%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">IT</span>
              <span className="text-sm font-medium text-yellow-600">75%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Operations</span>
              <span className="text-sm font-medium text-green-600">85%</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Loan Distribution</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Education Loans</span>
              <span className="text-sm font-medium text-blue-600">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Home Improvement</span>
              <span className="text-sm font-medium text-green-600">28%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Medical Expenses</span>
              <span className="text-sm font-medium text-purple-600">22%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Other</span>
              <span className="text-sm font-medium text-gray-600">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationalAnalytics;
