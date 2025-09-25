import React from 'react';
import NewApplicationModal from './NewApplicationModal';
import { useAuth } from '../../context/AuthContext';
import { FileText, Eye } from 'lucide-react';

const MyApplications: React.FC = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = React.useState(false);
  const [applications, setApplications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError("");
      try {
        const loanService = (await import('../../services/loanService')).default;
        const data = await loanService.getMyApplications();
        // sort newest first by submittedAt if present
        const sorted = [...(data || [])].sort((a, b) => {
          const da = a?.submittedAt ? new Date(a.submittedAt).getTime() : 0;
          const db = b?.submittedAt ? new Date(b.submittedAt).getTime() : 0;
          return db - da;
        });
        setApplications(sorted);
      } catch (err: any) {
        setError('Failed to fetch applications.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

    const handleApplicationSubmitted = () => {
      setShowModal(false);
      // Refresh applications after submit
      const fetchApplications = async () => {
        const loanService = (await import('../../services/loanService')).default;
        const data = await loanService.getMyApplications();
        const sorted = [...(data || [])].sort((a, b) => {
          const da = a?.submittedAt ? new Date(a.submittedAt).getTime() : 0;
          const db = b?.submittedAt ? new Date(b.submittedAt).getTime() : 0;
          return db - da;
        });
        setApplications(sorted);
      };
      fetchApplications();
    };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', minimumFractionDigits: 0 }).format(Number.isFinite(amount) ? amount : 0);

  const formatDate = (value?: string) => {
    if (!value) return '—';
    const d = new Date(value);
    return isNaN(d.getTime()) ? '—' : d.toLocaleDateString();
  };

  const humanize = (text?: string) => (text ? text.replace(/_/g, ' ') : '—');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Loan Applications</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setShowModal(true)}
        >
          New Application
        </button>
      </div>
      <NewApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onApplicationSubmitted={handleApplicationSubmitted}
        staffId={user?.userId}
      />

      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">Loading...</div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center text-red-600">{error}</div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
          <p className="text-gray-600 mb-4">You haven't submitted any loan applications yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Requested</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application, idx) => (
                <tr key={application.id || application.applicationId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatAmount(Number(application.amount))}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.purpose || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>{humanize(application.status)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{application.reviewStage || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(application.submittedAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><Eye className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Status Legend */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Under Review</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Approved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Rejected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
