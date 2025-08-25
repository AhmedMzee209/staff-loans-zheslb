import React from 'react';

const PerformanceMetrics: React.FC = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">Performance Metrics</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Monthly KPIs</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Loan Processing Time</span>
            <span className="text-sm font-medium text-green-600">3.2 days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Approval Rate</span>
            <span className="text-sm font-medium text-green-600">89%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Customer Satisfaction</span>
            <span className="text-sm font-medium text-blue-600">4.2/5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Error Rate</span>
            <span className="text-sm font-medium text-green-600">2.1%</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Team Efficiency</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Average Response Time</span>
            <span className="text-sm font-medium text-green-600">4 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Task Completion</span>
            <span className="text-sm font-medium text-green-600">94%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Training Hours</span>
            <span className="text-sm font-medium text-blue-600">12/month</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Innovation Projects</span>
            <span className="text-sm font-medium text-purple-600">3 active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PerformanceMetrics;
