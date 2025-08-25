import React, { useState } from 'react';
import Layout from '../components/Layout';
import Overview from './hod/Overview';
import PendingReview from './hod/PendingReview';
import Approved from './hod/Approved';
import Rejected from './hod/Rejected';
import TeamManagement from './hod/TeamManagement';
import Reports from './hod/Reports';
import ReviewModal from './hod/ReviewModal';
import { BarChart3, Clock, CheckCircle, XCircle, Users, TrendingUp } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'pending', label: 'Pending Review', icon: Clock },
  { id: 'approved', label: 'Approved', icon: CheckCircle },
  { id: 'rejected', label: 'Rejected', icon: XCircle },
  { id: 'team', label: 'Team Management', icon: Users },
  { id: 'reports', label: 'Reports', icon: TrendingUp }
];

const HODDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    comments: '',
    decision: 'APPROVED' as 'APPROVED' | 'REJECTED'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'pending':
        return <PendingReview />;
      case 'approved':
        return <Approved />;
      case 'rejected':
        return <Rejected />;
      case 'team':
        return <TeamManagement />;
      case 'reports':
        return <Reports />;
      default:
        return <Overview />;
    }
  };

  return (
    <Layout title="HOD Dashboard">
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
          setReviewData({ comments: '', decision: 'APPROVED' });
        }}
      />
    </Layout>
  );
};

export default HODDashboard;