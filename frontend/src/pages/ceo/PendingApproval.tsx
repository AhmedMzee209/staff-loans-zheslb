
import React from 'react';
import { FileText, Eye } from 'lucide-react';

interface PendingApprovalProps {
  onFinalApproval?: (applicationId: string) => void;
}

const PendingApproval: React.FC<PendingApprovalProps> = ({ onFinalApproval }) => {
  // Placeholder data - will be replaced with real API calls
  const placeholderApplications: any[] = [];
  const pendingCOApproval = placeholderApplications.filter(app =>
    app.status === 'CEO_APPROVAL' || app.status === 'FINAL_APPROVAL'
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Applications Pending Final Approval</h3>
      {pendingCOApproval.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No applications pending final approval</p>
          <p className="text-sm text-gray-500 mt-2">Connect to backend to view real data</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingCOApproval.map((application) => (
            <div key={application.id} className="bg-white rounded-xl shadow-sm p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h5 className="font-medium text-gray-900">
                      {application.staff_member?.full_name || 'Staff Member'}
                    </h5>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                      Final Approval Required
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <h6 className="font-medium text-gray-900 mb-2">Strategic Assessment</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Purpose:</strong> Loan Purpose</p>
                        <p className="text-sm"><strong>Amount:</strong> {formatAmount(application.amount || 1000000)}</p>
                        <p className="text-sm"><strong>Department:</strong> {application.staff_member?.department || 'Department'}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Monthly Deduction:</strong> {formatAmount(50000)}</p>
                        <p className="text-sm"><strong>Period:</strong> 20 months</p>
                        <p className="text-sm"><strong>Risk Level:</strong> <span className="text-green-600">Low</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span><strong>Position:</strong> {application.staff_member?.position || 'Position'}</span>
                    <span><strong>Applied:</strong> {new Date(application.created_at || Date.now()).toLocaleDateString()}</span>
                    <span><strong>Previous Approvals:</strong> HOD ✓, Accountant ✓</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onFinalApproval && onFinalApproval(application.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Final Approval
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingApproval;
