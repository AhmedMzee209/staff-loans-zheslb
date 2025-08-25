import React from 'react';

const OperationalReports: React.FC = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">Operational Reports</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Weekly Summary</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">New Applications</span>
            <span className="text-sm font-medium">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Processed</span>
            <span className="text-sm font-medium text-green-600">15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Pending</span>
            <span className="text-sm font-medium text-yellow-600">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Issues Resolved</span>
            <span className="text-sm font-medium text-blue-600">5</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Resource Utilization</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Staff Utilization</span>
            <span className="text-sm font-medium text-green-600">87%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">System Uptime</span>
            <span className="text-sm font-medium text-green-600">99.2%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Budget Utilization</span>
            <span className="text-sm font-medium text-blue-600">78%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Training Budget</span>
            <span className="text-sm font-medium text-purple-600">65%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OperationalReports;
