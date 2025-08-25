import React, { useState } from 'react';
import Layout from '../components/Layout';
    import AccountantOverview from './accountant/Overview';
    import FinancialReview from './accountant/FinancialReview';
    import LoanCalculator from './accountant/LoanCalculator';
    import ProcessedLoans from './accountant/ProcessedLoans';
    import FinancialReports from './accountant/FinancialReports';
    import PaymentRecords from './accountant/PaymentRecords';

    const tabs = [
      { id: 'overview', label: 'Overview' },
      { id: 'financial', label: 'Financial Review' },
      { id: 'calculator', label: 'Loan Calculator' },
      { id: 'processed', label: 'Processed Loans' },
      { id: 'reports', label: 'Financial Reports' },
      { id: 'payments', label: 'Payment Records' },
    ];

    const AccountantDashboard: React.FC = () => {
      const [activeTab, setActiveTab] = useState('overview');

      const renderContent = () => {
        switch (activeTab) {
          case 'overview':
            return <AccountantOverview />;
          case 'financial':
            return <FinancialReview />;
          case 'calculator':
            return <LoanCalculator />;
          case 'processed':
            return <ProcessedLoans />;
          case 'reports':
            return <FinancialReports />;
          case 'payments':
            return <PaymentRecords />;
          default:
            return <AccountantOverview />;
        }
      };

      return (
        <Layout title="Accountant Dashboard">
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {renderContent()}
          </div>
    </Layout>
  );
};

export default AccountantDashboard;