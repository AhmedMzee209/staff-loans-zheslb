
import React from 'react';

const ComplianceMonitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Compliance Monitoring</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Regulatory Compliance</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Anti-Money Laundering</span>
              <span className="text-sm font-medium text-green-600">100%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Know Your Customer</span>
              <span className="text-sm font-medium text-green-600">95%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Credit Assessment</span>
              <span className="text-sm font-medium text-yellow-600">82%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Documentation</span>
              <span className="text-sm font-medium text-green-600">88%</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Policy Adherence</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Loan Limits</span>
              <span className="text-sm font-medium text-green-600">100%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Approval Process</span>
              <span className="text-sm font-medium text-green-600">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Risk Assessment</span>
              <span className="text-sm font-medium text-yellow-600">76%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monitoring</span>
              <span className="text-sm font-medium text-green-600">91%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceMonitoring;
