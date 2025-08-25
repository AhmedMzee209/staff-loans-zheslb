import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { roleService } from './../../services/roleService';

interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

interface EditRoleModalProps {
  role: Role;
  onClose: () => void;
  onSaved: () => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({ role, onClose, onSaved }) => {
  const [form, setForm] = useState({ roleName: role.roleName, description: role.description });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await roleService.update(role.roleId, form);
      onClose();
      onSaved();
    } catch (err: any) {
      setError(err?.message || 'Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
          onClick={onClose}
          disabled={loading}
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Role</h3>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-2">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
          <input
            className="w-full border rounded px-2 py-1"
            name="roleName"
            value={form.roleName}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            className="w-full border rounded px-2 py-1"
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            onClick={handleSave}
            disabled={loading}
          >
            <Check className="h-4 w-4 mr-1" />
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;