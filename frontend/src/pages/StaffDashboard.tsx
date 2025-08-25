import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, FileText, Upload, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Overview from './staff/Overview';
import MyApplications from './staff/MyApplications';
import Documents from './staff/Documents';
import Profile from './staff/Profile';
import NewApplicationModal from './staff/NewApplicationModal';
import ProfileModal from './staff/ProfileModal';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Mail },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'applications':
        return <MyApplications />;
      case 'documents':
        return <Documents />;
      case 'profile':
        return <Profile />;
      default:
        return <Overview />;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setShowNewApplication(true)}
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">New Application</h3>
                <p className="text-sm text-blue-600">Submit a new loan request</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">View Applications</h3>
                <p className="text-sm text-green-600">Check your loan status</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-purple-900">Update Profile</h3>
                <p className="text-sm text-purple-600">Manage your information</p>
              </div>
            </div>
          </button>
        </div>

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

        {/* Modals */}
        <NewApplicationModal
          isOpen={showNewApplication}
          onClose={() => setShowNewApplication(false)}
        />

        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
                    />
                  </div>
    </Layout>
  );
};

export default StaffDashboard;