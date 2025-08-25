
import React from 'react';

const AuditPlanning: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Audit Planning</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Upcoming Audits</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Q2 2025 Compliance Review</p>
              <p className="text-xs text-blue-600">Scheduled: April 15, 2025</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Process Efficiency Audit</p>
              <p className="text-xs text-green-600">Scheduled: May 1, 2025</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Risk Assessment</p>
              <p className="text-xs text-purple-600">Scheduled: May 15, 2025</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Audit Resources</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Audit Team</span>
              <span className="text-sm font-medium">3 members</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Budget Allocation</span>
              <span className="text-sm font-medium text-green-600">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Training Hours</span>
              <span className="text-sm font-medium">24/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tools & Software</span>
              <span className="text-sm font-medium text-green-600">Updated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditPlanning;
