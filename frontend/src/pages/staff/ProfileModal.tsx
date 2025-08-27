import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/shared';
import { useAuth } from '../../context/AuthContext';
import userService, { UserProfile } from '../../services/userService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialProfile: Partial<UserProfile> = {
  firstName: '',
  lastName: '',
  department: '',
  position: '',
  zanzibarId: '',
  salaryNumber: '',
  zssfNumber: '',
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [form, setForm] = useState<Partial<UserProfile>>(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileExists, setProfileExists] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && user?.userId) {
      setLoading(true);
      userService.getUserProfile(user.userId)
        .then((profile) => {
          setForm({ ...initialProfile, ...profile });
          setProfileExists(true);
        })
        .catch((err) => {
          setForm(initialProfile);
          // Treat 404 and 403 as 'profile does not exist'
          if (err?.status === 404 || err?.status === 403) {
            setProfileExists(false);
          } else {
            setProfileExists(true);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, user?.userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Zanzibar ID validation: must be 9 digits, numbers only
    const zanzibarId = form.zanzibarId || '';
    if (!/^[0-9]{9}$/.test(zanzibarId)) {
      setError('Zanzibar ID must be exactly 9 digits and contain only numbers.');
      return;
    }
    setLoading(true);
    try {
      if (user?.userId) {
        if (profileExists) {
          await userService.updateUserProfile(user.userId, form);
        } else {
          await userService.createStaffProfile({ ...form, userId: user.userId, userEmail: user.email });
        }
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Helper: check if profile is complete (customize required fields as needed)
  const isProfileComplete = (profile: Partial<UserProfile>) => {
    return !!(profile.firstName && profile.lastName && profile.department && profile.position && profile.zanzibarId && profile.salaryNumber && profile.zssfNumber);
  };

  return (
    <Modal isOpen={isOpen} onClose={isProfileComplete(form) ? onClose : (() => {})} title="Edit Profile" size="lg">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input name="firstName" type="text" value={form.firstName || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter first name" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input name="lastName" type="text" value={form.lastName || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter last name" required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input name="department" type="text" value={form.department || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Department" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
            <input name="position" type="text" value={form.position || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Position" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zanzibar ID</label>
            <input name="zanzibarId" type="text" value={form.zanzibarId || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Zanzibar ID" maxLength={9} pattern="[0-9]{9}" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Number</label>
            <input name="salaryNumber" type="text" value={form.salaryNumber || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Salary Number" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZSSF Number</label>
            <input name="zssfNumber" type="text" value={form.zssfNumber || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="ZSSF Number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email (read-only)</label>
            <input name="userEmail" type="email" value={form.userEmail || user?.email || ''} readOnly className="w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-lg" />
          </div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex justify-end space-x-4 pt-4">
          {/* Only show Cancel if profile is complete */}
          {isProfileComplete(form) && (
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" disabled={loading}>Cancel</button>
          )}
          <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
