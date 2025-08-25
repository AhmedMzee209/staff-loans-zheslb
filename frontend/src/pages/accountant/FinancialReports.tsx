import React from 'react';
const FinancialReports: React.FC = () => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Financial Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Monthly Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Loans Approved</span>
              <span className="text-sm font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Amount</span>
              <span className="text-sm font-medium text-green-600">{formatAmount(25000000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Monthly Collections</span>
              <span className="text-sm font-medium text-blue-600">{formatAmount(3500000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Outstanding Balance</span>
              <span className="text-sm font-medium text-yellow-600">{formatAmount(18000000)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Approval Rate</span>
              <span className="text-sm font-medium text-green-600">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Loan Size</span>
              <span className="text-sm font-medium text-blue-600">{formatAmount(3125000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Collection Rate</span>
              <span className="text-sm font-medium text-emerald-600">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Risk Score</span>
              <span className="text-sm font-medium text-green-600">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
