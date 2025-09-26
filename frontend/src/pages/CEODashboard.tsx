// RENAMED: CEODashboard
import React, { useState } from 'react';
import Layout from '../components/Layout';
import StrategicOverview from './ceo/StrategicOverview';
import PendingApproval from './ceo/PendingApproval';
import ApprovedLoans from './ceo/ApprovedLoans';
import RejectedLoans from './ceo/RejectedLoans';
import ApprovalModal from './ceo/ApprovalModal';
import { BarChart3, FileText, CheckCircle, XCircle } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'pending', label: 'Pending Approval', icon: FileText },
  { id: 'approved', label: 'Approved Loans', icon: CheckCircle },
  { id: 'rejected', label: 'Rejected Loans', icon: XCircle }
];

const CEODashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [approvalModal, setApprovalModal] = useState(false);
  const [approvalData, setApprovalData] = useState({
    comments: '',
    decision: 'APPROVED' as 'APPROVED' | 'REJECTED',
    strategicNotes: ''
  });

  // Handler for opening the approval modal
  const handleFinalApproval = (applicationId: string) => {
    setApprovalModal(true);
    // Optionally set selected application if needed
  };

  const submitFinalApproval = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle approval logic here
    setApprovalModal(false);
    setApprovalData({ comments: '', decision: 'APPROVED', strategicNotes: '' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StrategicOverview />;
      case 'pending':
        return <PendingApproval />;
      case 'approved':
        return <ApprovedLoans />;
      case 'rejected':
        return <RejectedLoans />;
      default:
        return <StrategicOverview />;
    }
  };

  return (
    <Layout title="CEO Dashboard">
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

      {/* Approval Modal */}
      <ApprovalModal
        open={approvalModal}
        onClose={() => setApprovalModal(false)}
        approvalData={approvalData}
        setApprovalData={setApprovalData}
        onSubmit={submitFinalApproval}
      />
    </Layout>
  );
};

export default CEODashboard;