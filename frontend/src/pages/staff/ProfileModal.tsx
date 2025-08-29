
import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/shared';
import { useAuth } from '../../context/AuthContext';
import userService, { UserProfile } from '../../services/userService';

type ProfileModalMode = 'create' | 'edit';
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ProfileModalMode;
}


const initialProfile: Partial<UserProfile> = {
  firstName: '',
  lastName: '',
  department: '',
  position: '',
  zanzibarId: '',
  salaryNumber: '',
  zssfNumber: '',
  profileImage: '',
};


// (Removed duplicate definition. All logic is now inside the main ProfileModal component below.)

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, mode }) => {
  const { user } = useAuth();
  const [form, setForm] = useState<Partial<UserProfile>>(initialProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileExists, setProfileExists] = useState<boolean>(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match('image/jpeg')) {
      setError('Only JPG images are allowed.');
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      if (img.width !== 120 || img.height !== 150) {
        setError('Image must be exactly 120x150 pixels.');
        setImageFile(null);
        setImagePreview(null);
      } else {
        setError(null);
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    };
    img.onerror = () => setError('Invalid image file.');
    img.src = URL.createObjectURL(file);
  };

  useEffect(() => {
    if (isOpen && user?.userId) {
      setLoading(true);
      if (mode === 'edit') {
        userService.getUserProfile(user.userId)
          .then((profile) => {
            // Map backend profileId to form.id for update
            setForm({ ...initialProfile, ...profile, id: profile.profileId });
            setProfileExists(!!profile && !!profile.profileId);
          })
          .catch((err) => {
            setForm(initialProfile);
            setProfileExists(false);
          })
          .finally(() => setLoading(false));
      } else {
        setForm(initialProfile);
        setProfileExists(false);
        setLoading(false);
      }
    }
  }, [isOpen, user?.userId, mode]);

  // Debug: log form state when modal opens
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line no-console
      console.log('ProfileModal form state:', form);
    }
  }, [isOpen, form]);

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
      let updatedProfile: UserProfile | undefined;
      let profileId: string | undefined;
      if (user?.userId) {
        // Use PUT if form.id exists, otherwise POST
        if (form.id) {
          updatedProfile = await userService.updateUserProfile(form.id, form);
        } else {
          updatedProfile = await userService.createStaffProfile({ ...form, userId: user.userId, userEmail: user.email });
        }
        profileId = updatedProfile?.id || form.id || user.userId;
        if (imageFile && profileId) {
          await userService.uploadProfileImage(profileId, imageFile);
        }
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  // Helper: check if profile is complete (customize required fields as needed)
  const isProfileComplete = (profile: Partial<UserProfile>) => {
    return !!(profile.firstName && profile.lastName && profile.department && profile.position && profile.zanzibarId && profile.salaryNumber && profile.zssfNumber);
  };

  return (
  <Modal isOpen={isOpen} onClose={isProfileComplete(form) ? onClose : (() => {})} title={mode === 'edit' ? 'Edit Profile' : 'Complete Registration'} size="lg">
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
        {/* Profile image upload */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (JPG, 120x150px)</label>
          <input type="file" accept="image/jpeg" onChange={handleImageChange} className="mb-2" />
          {imagePreview || form.profileImage ? (
            <img
              src={imagePreview || (form.profileImage ? `/profile-images/${form.profileImage}` : undefined)}
              alt="Profile Preview"
              className="w-[60px] h-[75px] rounded border object-cover"
            />
          ) : null}
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex justify-end space-x-4 pt-4">
          {/* Only show Cancel if profile is complete */}
          {isProfileComplete(form) && (
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" disabled={loading}>Cancel</button>
          )}
          <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all" disabled={loading}>
            {mode === 'edit' ? (loading ? 'Updating...' : 'Update') : (loading ? 'Saving...' : 'Register')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
