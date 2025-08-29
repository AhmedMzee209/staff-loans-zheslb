
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import userService, { UserProfile } from '../../services/userService';
import ProfileModal from './ProfileModal';
import { User, Mail, Briefcase, Building2, CreditCard, Hash, BadgeDollarSign } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = () => {
    if (user?.userId) {
      setLoading(true);
      userService.getUserProfile(user.userId)
        .then(setProfile)
        .catch(() => setError('Could not load profile'))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

  // When modal closes, refresh profile
  const handleModalClose = () => {
    setShowModal(false);
    setTimeout(fetchProfile, 100); // slight delay to ensure backend is updated
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-2xl bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl shadow-lg p-8 mt-4">
        <div className="flex flex-col items-center mb-8">
          {profile?.profileImage ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, '') : window.location.origin}/profile-images/${profile.profileImage}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border shadow-md mb-3"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-700 shadow-md mb-3">
              {profile ? (profile.firstName?.[0] || '') + (profile.lastName?.[0] || '') : <User className="w-12 h-12 text-blue-400" />}
            </div>
          )}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile ? `${profile.firstName} ${profile.lastName}` : 'No Name'}</h2>
          <div className="text-gray-500">{profile?.position || 'Staff'}</div>
        </div>
        {profile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700"><Building2 className="w-5 h-5 text-blue-500" /> <span className="font-medium">Department:</span> {profile.department}</div>
              <div className="flex items-center gap-3 text-gray-700"><Briefcase className="w-5 h-5 text-emerald-500" /> <span className="font-medium">Position:</span> {profile.position}</div>
              <div className="flex items-center gap-3 text-gray-700"><Mail className="w-5 h-5 text-pink-500" /> <span className="font-medium">Email:</span> {profile.userEmail || user?.email}</div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700"><CreditCard className="w-5 h-5 text-indigo-500" /> <span className="font-medium">Zanzibar ID:</span> {profile.zanzibarId}</div>
              <div className="flex items-center gap-3 text-gray-700"><BadgeDollarSign className="w-5 h-5 text-yellow-500" /> <span className="font-medium">Salary Number:</span> {profile.salaryNumber}</div>
              <div className="flex items-center gap-3 text-gray-700"><Hash className="w-5 h-5 text-purple-500" /> <span className="font-medium">ZSSF Number:</span> {profile.zssfNumber}</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center">No profile data found.</div>
        )}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-emerald-700 transition-all font-semibold"
          >
            {profile ? 'Update Profile' : 'Complete Registration'}
          </button>
        </div>
      </div>
  <ProfileModal isOpen={showModal} onClose={handleModalClose} mode={profile ? 'edit' : 'create'} />
    </div>
  );
};

export default Profile;
