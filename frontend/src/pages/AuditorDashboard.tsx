import React, { useState } from 'react';
import Layout from '../components/Layout';
import AuditOverview from './auditor/AuditOverview';
import ComplianceMonitoring from './auditor/ComplianceMonitoring';
import RiskAssessment from './auditor/RiskAssessment';
import AuditReports from './auditor/AuditReports';
import AuditFindings from './auditor/AuditFindings';
import AuditPlanning from './auditor/AuditPlanning';
import AuditModal from './auditor/AuditModal';
import { BarChart3, Shield, AlertTriangle, FileText, Search, Target } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Audit Overview', icon: BarChart3 },
  { id: 'compliance', label: 'Compliance Monitoring', icon: Shield },
  { id: 'risk', label: 'Risk Assessment', icon: AlertTriangle },
  { id: 'audit', label: 'Audit Reports', icon: FileText },
  { id: 'findings', label: 'Audit Findings', icon: Search },
  { id: 'planning', label: 'Audit Planning', icon: Target },
];

const AuditorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [auditModal, setAuditModal] = useState(false);
  const [auditData, setAuditData] = useState({
    findings: '',
    riskLevel: 'LOW' as 'LOW' | 'MEDIUM' | 'HIGH',
    complianceStatus: 'COMPLIANT' as 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL',
    recommendations: ''
  });

  const handleAuditReview = () => {
    setAuditModal(true);
  };

  const submitAuditReview = (e: React.FormEvent) => {
    e.preventDefault();
    setAuditModal(false);
    setAuditData({ findings: '', riskLevel: 'LOW', complianceStatus: 'COMPLIANT', recommendations: '' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AuditOverview />;
      case 'compliance':
        return <ComplianceMonitoring />;
      case 'risk':
        return <RiskAssessment onAuditReview={handleAuditReview} />;
      case 'audit':
        return <AuditReports />;
      case 'findings':
        return <AuditFindings />;
      case 'planning':
        return <AuditPlanning />;
      default:
        return <AuditOverview />;
    }
  };

  return (
    <Layout title="Auditor Dashboard">
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

      {/* Audit Review Modal */}
      <AuditModal
        open={auditModal}
        onClose={() => setAuditModal(false)}
        auditData={auditData}
        setAuditData={setAuditData}
        onSubmit={submitAuditReview}
      />
    </Layout>
  );
};

export default AuditorDashboard; 