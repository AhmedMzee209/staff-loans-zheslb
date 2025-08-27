import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Mail, FileText, User, CheckCircle, Clock, Eye } from 'lucide-react';
  // Utility: get status color for badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Under Review':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  // Utility: format amount (placeholder)
  const formatAmount = (amount: number) =>
    amount ? `TZS ${amount.toLocaleString()}` : '-';
import { useAuth } from '../context/AuthContext';
// import Overview from './staff/Overview';
// import MyApplications from './staff/MyApplications';
// import Documents from './staff/Documents';
import Profile from './staff/Profile';
import NewApplicationModal from './staff/NewApplicationModal';
import ProfileModal from './staff/ProfileModal';
import userService, { UserProfile } from '../services/userService';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewApplication, setShowNewApplication] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Mail },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Helper: check if profile is complete (customize required fields as needed)
  const isProfileComplete = (profile: UserProfile | null) => {
    if (!profile) return false;
    // Check all required fields for completeness
    return !!(
      profile.firstName &&
      profile.lastName &&
      profile.department &&
      profile.position &&
      profile.zanzibarId &&
      profile.salaryNumber &&
      profile.zssfNumber
    );
  };

  // On mount, fetch staff profile
  useEffect(() => {
    if (user?.userId) {
      setProfileLoading(true);
      userService.getUserProfile(user.userId)
        .then((data) => {
          setProfile(data);
          if (!isProfileComplete(data)) {
            setShowProfileModal(true);
          }
        })
        .catch(() => {
          // If profile does not exist, force modal open
          setShowProfileModal(true);
        })
        .finally(() => setProfileLoading(false));
    }
  }, [user?.userId]);

  // When profile modal closes, re-fetch profile to check completeness
  const handleProfileModalClose = () => {
    setShowProfileModal(false);
    if (user?.userId) {
      userService.getUserProfile(user.userId)
        .then((data) => {
          setProfile(data);
          if (!isProfileComplete(data)) {
            setShowProfileModal(true);
          }
        });
    }
  };


  // Dummy stats and applications for demonstration; replace with real data fetching as needed
  const stats = [
    {
      label: 'Total Applications',
      value: 12,
      icon: FileText,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Pending',
      value: 3,
      icon: Clock,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-500',
    },
    {
      label: 'Under Review',
      value: 2,
      icon: Eye,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Completed',
      value: 7,
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  const applications = [
    { id: 1, type: 'Personal Loan', status: 'Pending', date: '2025-08-01' },
    { id: 2, type: 'Car Loan', status: 'Under Review', date: '2025-08-10' },
    { id: 3, type: 'Home Loan', status: 'Completed', date: '2025-07-15' },
    { id: 4, type: 'Education Loan', status: 'Pending', date: '2025-08-20' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:shadow-xl transition-all duration-200"
                  >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-3 ${stat.iconBg}`}>
                      <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-md font-medium text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h4 className="text-lg font-medium text-gray-900">Recent Applications</h4>
              </div>
              {applications.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No loan applications yet</p>
                  <p className="text-sm text-gray-500 mt-2">Click \"New Application\" to get started</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {applications.slice(0, 3).map((application) => (
                    <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h5 className="font-medium text-gray-900">
                              Application #{application.id}
                            </h5>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                              {application.status.replace('_', ' ')}
                            </span>
                          </div>
                          {/* Details placeholder */}
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600">
                              <strong>Purpose:</strong> Personal
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Amount:</strong> {formatAmount(1500000)}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {application.date && new Date(application.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      case 'applications':
        return (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">My Applications</h2>
              <button
                onClick={() => setShowNewApplication(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
              >
                + New Application
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{app.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            app.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : app.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{app.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'profile':
        return <Profile />;
      default:
        return null;
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

  {/* ...Quick Actions removed... */}

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
          onClose={handleProfileModalClose}
        />
        {/* Optionally, block UI if profile is loading or incomplete */}
        {profileLoading && (
          <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
            <div className="text-lg font-semibold text-gray-700">Loading profile...</div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StaffDashboard;