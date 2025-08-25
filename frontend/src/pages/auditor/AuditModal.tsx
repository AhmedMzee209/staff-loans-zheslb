
import React from 'react';
import { Shield } from 'lucide-react';

interface AuditModalProps {
  open: boolean;
  onClose: () => void;
  auditData: {
    findings: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    complianceStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL';
    recommendations: string;
  };
  setAuditData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AuditModal: React.FC<AuditModalProps> = ({ open, onClose, auditData, setAuditData, onSubmit }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-medium text-gray-900">Audit Review</h3>
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
              Risk Level
            </label>
            <select
              value={auditData.riskLevel}
              onChange={(e) => setAuditData({ ...auditData, riskLevel: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compliance Status
            </label>
            <select
              value={auditData.complianceStatus}
              onChange={(e) => setAuditData({ ...auditData, complianceStatus: e.target.value as 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="COMPLIANT">Compliant</option>
              <option value="PARTIAL">Partially Compliant</option>
              <option value="NON_COMPLIANT">Non-Compliant</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audit Findings
            </label>
            <textarea
              value={auditData.findings}
              onChange={(e) => setAuditData({ ...auditData, findings: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Describe your audit findings..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommendations
            </label>
            <textarea
              value={auditData.recommendations}
              onChange={(e) => setAuditData({ ...auditData, recommendations: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Provide recommendations for improvement..."
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
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium"
            >
              Submit Audit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuditModal;
