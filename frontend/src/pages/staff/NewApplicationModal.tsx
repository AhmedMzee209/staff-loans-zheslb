import React from 'react';
import type { LoanApplication } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/shared';

interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplicationSubmitted?: () => void;
  staffId?: string;
}

const NewApplicationModal: React.FC<NewApplicationModalProps> = ({ isOpen, onClose, onApplicationSubmitted }) => {
  // ...existing code...
  const [showSuccessBox, setShowSuccessBox] = React.useState(false);
  const { user } = useAuth();
  const [amount, setAmount] = React.useState<number>(0);
  const [purpose, setPurpose] = React.useState<string>("");
  const monthlyDeduction = amount > 0 ? Math.ceil(amount / 18) : 0;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const deductionPeriod = 18;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const loanService = (await import('../../services/loanService')).default;
      await loanService.createApplication({
        requestedAmount: amount,
        loanPurpose: purpose,
        monthlyDeduction,
        deductionPeriod,
        staffId: user?.userId ?? '',
        status: 'SUBMITTED' // Set status to SUBMITTED when staff submits application
      });
      setShowSuccessBox(true);
      setTimeout(() => {
        setShowSuccessBox(false);
        onClose();
      }, 1800);
      if (typeof onApplicationSubmitted === 'function') onApplicationSubmitted();
      setAmount(0);
      setPurpose("");
    } catch (err: any) {
      console.error('Loan application submit error:', err);
      setError('Failed to submit application. ' + (err?.message || 'Unknown error. Check console for details.'));
    } finally {
      setLoading(false);
    }
  };

  // Loan details array for table, placed just before return

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Loan Application" size="lg">
      {showSuccessBox ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center animate-bounce">
            <svg className="mx-auto mb-4 h-12 w-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            <h3 className="text-lg font-semibold mb-2">Application Submitted!</h3>
            <p className="text-gray-600 mb-4">Your loan application has been submitted successfully.</p>
          </div>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              placeholder="Describe the purpose of your loan"
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requested Amount (TZS)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                min={1}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Deduction (TZS)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-0 focus:border-gray-300"
                value={monthlyDeduction}
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deduction Period (Months)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:ring-0 focus:border-gray-300"
              value={deductionPeriod}
              readOnly
            />
          </div>
          {/* ...existing code... */}
          {error && (<div className="text-red-600 text-sm">{error}</div>)}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" disabled={loading}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all" disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</button>
          </div>
        </form>
      )}
    </Modal>
  );
}
export default NewApplicationModal;
