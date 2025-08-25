import React from 'react';
import { Calculator } from 'lucide-react';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  reviewData: {
    comments: string;
    decision: 'APPROVED' | 'REJECTED';
    recommendedAmount: string;
    recommendedDeduction: string;
  };
  setReviewData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, reviewData, setReviewData, onSubmit }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="h-6 w-6 text-emerald-600" />
              <h3 className="text-lg font-medium text-gray-900">Financial Review</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Financial Decision
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="decision"
                  value="APPROVED"
                  checked={reviewData.decision === 'APPROVED'}
                  onChange={e => setReviewData({ ...reviewData, decision: e.target.value })}
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Approve loan</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="decision"
                  value="REJECTED"
                  checked={reviewData.decision === 'REJECTED'}
                  onChange={e => setReviewData({ ...reviewData, decision: e.target.value })}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Reject loan</span>
              </label>
            </div>
          </div>

          {reviewData.decision === 'APPROVED' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommended Amount (TZS)
                </label>
                <input
                  type="number"
                  value={reviewData.recommendedAmount}
                  onChange={e => setReviewData({ ...reviewData, recommendedAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter approved amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Deduction (TZS)
                </label>
                <input
                  type="number"
                  value={reviewData.recommendedDeduction}
                  onChange={e => setReviewData({ ...reviewData, recommendedDeduction: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter monthly deduction"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Financial Comments
            </label>
            <textarea
              value={reviewData.comments}
              onChange={e => setReviewData({ ...reviewData, comments: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Add your financial assessment comments..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg transition-all font-medium ${
                reviewData.decision === 'APPROVED'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {reviewData.decision === 'APPROVED' ? 'Approve Loan' : 'Reject Loan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
