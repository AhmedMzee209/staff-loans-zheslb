
import React from 'react';
import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

const AuditFindings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Audit Findings</h3>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Documentation Incomplete</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Several loan applications missing required supporting documents.
                </p>
                <p className="text-xs text-yellow-600 mt-2">Impact: Medium | Priority: High</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
            <div className="flex items-start">
              <XCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Process Bypass</h4>
                <p className="text-sm text-red-700 mt-1">
                  One application approved without proper HOD review.
                </p>
                <p className="text-xs text-red-600 mt-2">Impact: High | Priority: Critical</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Best Practices</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Strong compliance in financial assessment and risk evaluation.
                </p>
                <p className="text-xs text-blue-600 mt-2">Impact: Positive | Priority: Low</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditFindings;
