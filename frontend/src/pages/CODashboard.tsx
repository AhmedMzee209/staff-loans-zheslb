import React, { useState } from 'react';
import Layout from '../components/Layout';
import { BarChart3, Users, FileText, TrendingUp, Shield, Target } from 'lucide-react';

const CODashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'operations', label: 'Operations', icon: TrendingUp },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'team', label: 'Team', icon: Users }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Chief Officer Dashboard</h2>
            <p className="text-gray-600">Welcome to the Chief Officer dashboard. Manage operations, compliance, and strategic initiatives.</p>
            
            {/* Placeholder for real data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Operations</h3>
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-500">Active operations</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Score</h3>
                <p className="text-3xl font-bold text-green-600">0%</p>
                <p className="text-sm text-gray-500">Current compliance</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Strategic Goals</h3>
                <p className="text-3xl font-bold text-purple-600">0</p>
                <p className="text-sm text-gray-500">Active goals</p>
              </div>
            </div>
          </div>
        );
      
      case 'operations':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Operations Management</h2>
            <p className="text-gray-600">Monitor and manage operational activities across departments.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Operations Overview</h3>
              <p className="text-gray-500">No operations data available. Connect to backend to view real data.</p>
            </div>
          </div>
        );
      
      case 'compliance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Compliance Monitoring</h2>
            <p className="text-gray-600">Track compliance status and regulatory requirements.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
              <p className="text-gray-500">No compliance data available. Connect to backend to view real data.</p>
            </div>
          </div>
        );
      
      case 'strategy':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Strategic Planning</h2>
            <p className="text-gray-600">Manage strategic initiatives and organizational goals.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Goals</h3>
              <p className="text-gray-500">No strategic data available. Connect to backend to view real data.</p>
            </div>
          </div>
        );
      
      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
            <p className="text-gray-600">Generate and view organizational reports and analytics.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
              <p className="text-gray-500">No reports available. Connect to backend to view real data.</p>
            </div>
          </div>
        );
      
      case 'team':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
            <p className="text-gray-600">Manage team members and organizational structure.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Overview</h3>
              <p className="text-gray-500">No team data available. Connect to backend to view real data.</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default CODashboard;
