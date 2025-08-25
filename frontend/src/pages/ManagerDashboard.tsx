import React, { useState } from 'react';
import Layout from '../components/Layout';
import OperationalOverview from './manager/OperationalOverview';
import TeamManagement from './manager/TeamManagement';
import PendingReview from './manager/PendingReview';
import PerformanceMetrics from './manager/PerformanceMetrics';
import OperationalReports from './manager/OperationalReports';
import PlanningStrategy from './manager/PlanningStrategy';
import ReviewModal from './manager/ReviewModal';
import { BarChart3, Users, Clock, TrendingUp, FileText, Target } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Operational Overview', icon: BarChart3 },
  { id: 'team', label: 'Team Management', icon: Users },
  { id: 'pending', label: 'Pending Review', icon: Clock },
  { id: 'performance', label: 'Performance Metrics', icon: TrendingUp },
  { id: 'reports', label: 'Operational Reports', icon: FileText },
  { id: 'planning', label: 'Planning & Strategy', icon: Target }
];

const ManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    comments: '',
    decision: 'APPROVED' as 'APPROVED' | 'REJECTED',
    operationalNotes: ''
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OperationalOverview />;
      case 'team':
        return <TeamManagement />;
      case 'pending':
        return <PendingReview />;
      case 'performance':
        return <PerformanceMetrics />;
      case 'reports':
        return <OperationalReports />;
      case 'planning':
        return <PlanningStrategy />;
      default:
        return <OperationalOverview />;
    }
  };

  return (
    <Layout title="Manager Dashboard">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
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
        {renderContent()}
      </div>

      {/* Review Modal */}
      <ReviewModal
        open={reviewModal}
        onClose={() => setReviewModal(false)}
        reviewData={reviewData}
        setReviewData={setReviewData}
        onSubmit={(e) => {
          e.preventDefault();
          setReviewModal(false);
          setReviewData({ comments: '', decision: 'APPROVED', operationalNotes: '' });
        }}
      />
    </Layout>
  );
};

export default ManagerDashboard;