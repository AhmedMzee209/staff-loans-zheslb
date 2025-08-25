import React from 'react';
import { Users } from 'lucide-react';

const TeamManagement: React.FC = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium text-gray-900">Team Management</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Ahmed Ali</h4>
            <p className="text-sm text-gray-500">Finance Officer</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Performance:</span>
            <span className="font-medium text-green-600">Excellent</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Applications:</span>
            <span className="font-medium">3</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Status:</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Fatuma Hassan</h4>
            <p className="text-sm text-gray-500">HR Assistant</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Performance:</span>
            <span className="font-medium text-green-600">Good</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Applications:</span>
            <span className="font-medium">2</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Status:</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Users className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">New Position</h4>
            <p className="text-sm text-gray-500">Finance Analyst</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Status:</span>
            <span className="font-medium text-blue-600">Hiring</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Applications:</span>
            <span className="font-medium">5</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Timeline:</span>
            <span className="font-medium">2 weeks</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TeamManagement;
