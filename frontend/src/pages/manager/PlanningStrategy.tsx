import React from 'react';

const PlanningStrategy: React.FC = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">Planning & Strategy</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Strategic Initiatives</h4>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Process Automation</p>
            <p className="text-xs text-blue-600">Q2 2025 - In Progress</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">Staff Training Program</p>
            <p className="text-xs text-green-600">Q1 2025 - Completed</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-800">Digital Transformation</p>
            <p className="text-xs text-purple-600">Q3 2025 - Planned</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Goals & Targets</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Q1 Target</span>
            <span className="text-sm font-medium text-green-600">✓ Achieved</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Q2 Target</span>
            <span className="text-sm font-medium text-blue-600">On Track</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Annual Goal</span>
            <span className="text-sm font-medium text-yellow-600">75% Complete</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Efficiency Target</span>
            <span className="text-sm font-medium text-green-600">Exceeded</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlanningStrategy;
