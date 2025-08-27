import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import userService, { UserProfile } from '../../services/userService';
import ProfileModal from './ProfileModal';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.userId) {
      setLoading(true);
      userService.getUserProfile(user.userId)
        .then(setProfile)
        .catch(() => setError('Could not load profile'))
        .finally(() => setLoading(false));
    }
  }, [user?.userId, showModal]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">My Profile</h3>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {profile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-2"><span className="font-semibold text-gray-700">First Name:</span> {profile.firstName}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Last Name:</span> {profile.lastName}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Department:</span> {profile.department}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Position:</span> {profile.position}</div>
            </div>
            <div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Zanzibar ID:</span> {profile.zanzibarId}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Salary Number:</span> {profile.salaryNumber}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">ZSSF Number:</span> {profile.zssfNumber}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Email:</span> {profile.userEmail || user?.email}</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center">No profile data found.</div>
        )}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>
      </div>
      <ProfileModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Profile;
