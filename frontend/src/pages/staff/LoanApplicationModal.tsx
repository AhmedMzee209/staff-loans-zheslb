import React, { useState } from 'react';
import { Modal } from '../../components/shared';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LoanApplicationFormData) => void;
}

export interface LoanApplicationFormData {
  loanPurpose: string;
  requestedAmount: number;
  monthlyDeduction: number;
  deductionPeriod: number;
}

const initialForm: LoanApplicationFormData = {
  loanPurpose: '',
  requestedAmount: 0,
  monthlyDeduction: 0,
  deductionPeriod: 0,
};

const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState<LoanApplicationFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'loanPurpose' ? value : Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.loanPurpose || form.requestedAmount <= 0 || form.monthlyDeduction <= 0 || form.deductionPeriod <= 0) {
      setError('All fields are required and must be positive numbers.');
      return;
    }
    setLoading(true);
    onSubmit(form);
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Loan Application" size="md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
          <textarea
            name="loanPurpose"
            value={form.loanPurpose}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the purpose of the loan"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requested Amount</label>
            <input
              name="requestedAmount"
              type="number"
              min={1}
              value={form.requestedAmount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Amount"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Deduction</label>
            <input
              name="monthlyDeduction"
              type="number"
              min={1}
              value={form.monthlyDeduction}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Monthly Deduction"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deduction Period (months)</label>
          <input
            name="deductionPeriod"
            type="number"
            min={1}
            value={form.deductionPeriod}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Number of months"
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" disabled={loading}>Cancel</button>
          <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoanApplicationModal;
