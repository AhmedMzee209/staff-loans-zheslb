
import React, { useState } from 'react';
import { Calculator, Eye } from 'lucide-react';

import ReviewModal from './ReviewModal';

const FinancialReview: React.FC = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState({
    comments: '',
    decision: 'APPROVED' as 'APPROVED' | 'REJECTED',
    recommendedAmount: '',
    recommendedDeduction: ''
  });

  const handleFinancialReview = (applicationId: string) => {
    const details = loanApplicationDetails.find(d => d.application_id === applicationId);
    setSelectedApplication(applicationId);
    setReviewData({
      ...reviewData,
      recommendedAmount: details?.requested_amount.toString() || '',
      recommendedDeduction: details?.monthly_deduction.toString() || ''
    });
    setReviewModal(true);
  };

  const submitFinancialReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewModal(false);
    setSelectedApplication(null);
    setReviewData({ comments: '', decision: 'APPROVED', recommendedAmount: '', recommendedDeduction: '' });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Applications for Financial Review</h3>
      {pendingReview.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No applications pending financial review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingReview.map((application) => {
            const details = loanApplicationDetails.find(d => d.application_id === application.id);
            return (
              <div key={application.id} className="bg-white rounded-xl shadow-sm p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h5 className="font-medium text-gray-900">
                        {application.staff_member?.full_name}
                      </h5>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        Financial Review
                      </span>
                    </div>
                    {details && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-3">
                        <h6 className="font-medium text-gray-900 mb-2">Loan Details</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm"><strong>Purpose:</strong> {details.loan_purpose}</p>
                            <p className="text-sm"><strong>Requested Amount:</strong> {formatAmount(details.requested_amount)}</p>
                            <p className="text-sm"><strong>Monthly Deduction:</strong> {formatAmount(details.monthly_deduction)}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm"><strong>Deduction Period:</strong> {details.deduction_period} months</p>
                            <p className="text-sm"><strong>Total Repayment:</strong> {formatAmount(details.monthly_deduction * details.deduction_period)}</p>
                            {details.guarantor_name && (
                              <p className="text-sm"><strong>Guarantor:</strong> {details.guarantor_name}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span><strong>Department:</strong> {application.staff_member?.department}</span>
                      <span><strong>Position:</strong> {application.staff_member?.position}</span>
                      <span><strong>Applied:</strong> {new Date(application.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleFinancialReview(application.id)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ReviewModal
        open={reviewModal}
        onClose={() => setReviewModal(false)}
        reviewData={reviewData}
        setReviewData={setReviewData}
        onSubmit={submitFinancialReview}
      />
    </div>
  );
};

export default FinancialReview;
