import { useState, useEffect } from 'react';
import { loanService } from '../services';
import type { LoanApplication } from '../types';

export const useLoanApplications = (userId?: string) => {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // If userId is provided, get user's applications, otherwise get all applications
      const data = userId 
        ? await loanService.getMyApplications()
        : await loanService.getAllApplications();
      
      setApplications(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const createApplication = async (applicationData: any) => {
    try {
      const newApplication = await loanService.createApplication(applicationData);
      setApplications(prev => [newApplication, ...prev]);
      return newApplication;
    } catch (err: any) {
      setError(err.message || 'Failed to create application');
      throw err;
    }
  };

  const updateApplication = async (id: string, updateData: any) => {
    try {
      const updatedApplication = await loanService.updateApplication({ id, ...updateData });
      setApplications(prev => 
        prev.map(app => app.id === id ? updatedApplication : app)
      );
      return updatedApplication;
    } catch (err: any) {
      setError(err.message || 'Failed to update application');
      throw err;
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      await loanService.deleteApplication(id);
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete application');
      throw err;
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [userId]);

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    createApplication,
    updateApplication,
    deleteApplication
  };
}; 