import React from 'react';

const SystemSettings: React.FC = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">General Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
            <input type="text" defaultValue="ZHELSB Loan Management System" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Loan Amount (TZS)</label>
            <input type="number" defaultValue="5000000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input type="number" defaultValue="30" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>High Security</option>
              <option>Medium Security</option>
              <option>Low Security</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Settings</button>
    </div>
  </div>
);

export default SystemSettings;
