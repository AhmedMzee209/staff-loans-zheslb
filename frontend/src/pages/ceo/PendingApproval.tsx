import React, { useState, useEffect } from 'react';
import { FileText, Calendar, DollarSign, User, Star, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { loanService } from '../../services/loanService';
import { userService } from '../../services/userService';
import { LoanApplication, LoanStatus } from '../../types';

interface ExtendedApplication extends LoanApplication {
  applicationNumber?: string;
  staffMember?: {
    id: string;
    fullName: string;
    email: string;
    staffId?: string;
  };
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
}

const PendingApproval: React.FC = () => {
  const [applications, setApplications] = useState<ExtendedApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [priorityModal, setPriorityModal] = useState<{ isOpen: boolean; applicationId: string | null }>({
    isOpen: false,
    applicationId: null
  });
  const [approvalModal, setApprovalModal] = useState<{ isOpen: boolean; applicationId: string | null }>({
    isOpen: false,
    applicationId: null
  });
  
  // Form states
  const [selectedPriority, setSelectedPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('MEDIUM');
  const [approvalData, setApprovalData] = useState({
    decision: 'APPROVE' as 'APPROVE' | 'REJECT' | 'DEFER',
    comments: '',
    conditions: ''
  });

  useEffect(() => {
    console.log('PendingApproval component mounted');
    loadPendingApplications();
  }, []);

  // Modal handlers
  const handlePriorityAssign = async () => {
    if (!priorityModal.applicationId) return;
    
    try {
      // Update the application priority locally (in real app, call API)
      setApplications(prev => prev.map(app => 
        app.id === priorityModal.applicationId 
          ? { ...app, priority: selectedPriority }
          : app
      ));
      
      console.log(`Assigned priority ${selectedPriority} to application ${priorityModal.applicationId}`);
      setPriorityModal({ isOpen: false, applicationId: null });
    } catch (error) {
      console.error('Failed to assign priority:', error);
    }
  };

  const handleApprovalDecision = async () => {
    if (!approvalModal.applicationId) return;
    
    try {
      console.log(`CEO Decision: ${approvalData.decision} for application ${approvalModal.applicationId}`);
      console.log('Comments:', approvalData.comments);
      console.log('Conditions:', approvalData.conditions);
      
      // In real app, call API to update application status
      // await loanService.updateApplicationStatus(approvalModal.applicationId, approvalData);
      
      setApprovalModal({ isOpen: false, applicationId: null });
      setApprovalData({ decision: 'APPROVE', comments: '', conditions: '' });
      
      // Refresh applications after decision
      loadPendingApplications();
    } catch (error) {
      console.error('Failed to process approval decision:', error);
    }
  };

  const loadPendingApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading applications from backend...');
      console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api');
      
      const allApplications = await loanService.getAllApplications();
      console.log('All applications from backend:', allApplications);
      console.log('Total applications:', allApplications?.length || 0);
      
      if (!allApplications || !Array.isArray(allApplications)) {
        console.warn('Invalid response from backend:', allApplications);
        setError('Invalid response from server. Expected an array of applications.');
        setApplications([]);
        return;
      }
      
      // Show all applications for now to debug what statuses we have
      console.log('Available statuses in applications:', 
        allApplications.map(app => app.status).filter((status, index, arr) => arr.indexOf(status) === index)
      );
      
      // Filter for applications with status "SUBMITTED" as specifically requested
      const submittedApplications = allApplications.filter(app => {
        if (!app || !app.status) return false;
        return app.status === 'SUBMITTED';
      });
      console.log('Applications with SUBMITTED status:', submittedApplications);
      console.log('Submitted applications count:', submittedApplications?.length || 0);
      
      // If no SUBMITTED applications found, we'll use the test data or show empty state
      if (submittedApplications.length === 0) {
        console.log('No SUBMITTED applications found');
      }
      
      // Transform applications to include additional fields with real applicant data
      const extendedApplications: ExtendedApplication[] = await Promise.all(
        submittedApplications.map(async (app, index) => {
          console.log(`Processing application ${index + 1}:`, app);
          
          let applicantName = 'Unknown Applicant';
          let applicantEmail = 'unknown@zheslb.co.tz';
          
          try {
            // Fetch real applicant profile data
            const userProfile = await userService.getUserProfile(app.applicantId);
            applicantName = `${userProfile.firstName} ${userProfile.lastName}`;
            applicantEmail = userProfile.userEmail || `${userProfile.firstName.toLowerCase()}.${userProfile.lastName.toLowerCase()}@zheslb.co.tz`;
          } catch (error) {
            console.warn(`Failed to fetch profile for applicant ${app.applicantId}:`, error);
            // Use fallback name if profile fetch fails
            applicantName = `Staff ${app.applicantId}`;
          }
          
          return {
            ...app,
            applicationNumber: `APP-${String(index + 1).padStart(4, '0')}`,
            staffMember: {
              id: app.applicantId || 'Unknown',
              fullName: applicantName,
              email: applicantEmail,
              staffId: app.applicantId || 'Unknown'
            },
            priority: (['HIGH', 'MEDIUM', 'LOW'] as const)[Math.floor(Math.random() * 3)]
          };
        })
      );
      
      console.log('Extended applications:', extendedApplications);
      setApplications(extendedApplications);
      
    } catch (error) {
      console.error('Failed to load applications from backend:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Check if it's a network error
      if (error && typeof error === 'object' && 'code' in error) {
        console.error('Network error code:', (error as any).code);
      }
      
      // Set empty applications on error - don't use dummy data
      setError(`Failed to connect to backend: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateMonthlyDeduction = (amount: number, term: number) => {
    if (!term || term === 0) return 0;
    // Simple calculation without interest for now
    return amount / term;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  console.log('PendingApproval rendering - loading:', loading, 'applications:', applications.length);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="animate-pulse space-y-4">
            <div className="text-center text-gray-500 mb-4">Loading applications...</div>
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Submitted Applications for CEO Review</h3>
          <p className="text-sm text-gray-600 mt-1">Applications with status "SUBMITTED" awaiting CEO decision</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={loadPendingApplications}
            disabled={loading}
            className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">Total: {applications.length}</div>
            <div className="text-xs text-gray-500">
              {error ? 'Connection Error' : 'Awaiting your decision'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {error ? (
          <div className="p-12 text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Connection Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={loadPendingApplications}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Submitted Applications</h3>
            <p className="text-gray-600">No applications with status "SUBMITTED" are currently awaiting CEO review.</p>
            <button 
              onClick={loadPendingApplications}
              className="mt-4 inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Applicant Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Requested Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Monthly Deduction
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Deduction Period
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Loan Purpose
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Current Stage
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application, index) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    {/* Application Number */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </div>
                    </td>
                    
                    {/* Applicant Name */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.staffMember?.fullName || 'Unknown Applicant'}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {application.staffMember?.staffId || application.applicantId}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Requested Amount */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          {formatAmount(application.amount)}
                        </span>
                      </div>
                    </td>
                    
                    {/* Monthly Deduction */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatAmount(calculateMonthlyDeduction(application.amount, application.term || 1))}
                      </div>
                    </td>
                    
                    {/* Deduction Period */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {application.term ? `${application.term} months` : 'Not specified'}
                      </div>
                    </td>
                    
                    {/* Loan Purpose */}
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <div className="truncate" title={application.purpose}>
                          {application.purpose || 'No purpose specified'}
                        </div>
                      </div>
                    </td>
                    
                    {/* Status */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        {application.status}
                      </span>
                    </td>
                    
                    {/* Current Stage */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        CEO Review
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setPriorityModal({ isOpen: true, applicationId: application.id })}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Assign Priority
                        </button>
                        <button 
                          onClick={() => {
                            setApprovalData({ decision: 'APPROVE', comments: '', conditions: '' });
                            setApprovalModal({ isOpen: true, applicationId: application.id });
                          }}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Assign Approval
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Priority Assignment Modal */}
      {priorityModal.isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Priority</h3>
              <div className="mt-2 px-7 py-3">
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Priority Level:</label>
                    <div className="space-y-2">
                      {(['HIGH', 'MEDIUM', 'LOW'] as const).map((priority) => (
                        <label key={priority} className="flex items-center">
                          <input
                            type="radio"
                            name="priority"
                            value={priority}
                            checked={selectedPriority === priority}
                            onChange={(e) => setSelectedPriority(e.target.value as 'HIGH' | 'MEDIUM' | 'LOW')}
                            className="mr-2"
                          />
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(priority)}`}>
                            {priority}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => setPriorityModal({ isOpen: false, applicationId: null })}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePriorityAssign}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Assign Priority
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval Decision Modal */}
      {approvalModal.isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                Assign Approval Decision
              </h3>
              <div className="mt-2 px-3 py-3 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Decision: <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="APPROVE"
                        checked={approvalData.decision === 'APPROVE'}
                        onChange={(e) => setApprovalData(prev => ({ ...prev, decision: e.target.value as 'APPROVE' | 'REJECT' | 'DEFER' }))}
                        className="mr-3 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-900">Approve</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="REJECT"
                        checked={approvalData.decision === 'REJECT'}
                        onChange={(e) => setApprovalData(prev => ({ ...prev, decision: e.target.value as 'APPROVE' | 'REJECT' | 'DEFER' }))}
                        className="mr-3 h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-900">Reject</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="DEFER"
                        checked={approvalData.decision === 'DEFER'}
                        onChange={(e) => setApprovalData(prev => ({ ...prev, decision: e.target.value as 'APPROVE' | 'REJECT' | 'DEFER' }))}
                        className="mr-3 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-900">Defer</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments: <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={approvalData.comments}
                    onChange={(e) => setApprovalData(prev => ({ ...prev, comments: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter your comments or reason for this decision..."
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    onClick={() => {
                      setApprovalModal({ isOpen: false, applicationId: null });
                      setApprovalData({ decision: 'APPROVE', comments: '', conditions: '' });
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApprovalDecision}
                    disabled={!approvalData.comments.trim()}
                    className={`px-4 py-2 rounded-md text-white ${
                      approvalData.decision === 'APPROVE' ? 'bg-green-600 hover:bg-green-700' :
                      approvalData.decision === 'REJECT' ? 'bg-red-600 hover:bg-red-700' :
                      'bg-blue-600 hover:bg-blue-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Submit Decision
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApproval;
