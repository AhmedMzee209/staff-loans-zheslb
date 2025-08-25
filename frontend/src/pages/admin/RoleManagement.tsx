import React, { useState } from 'react';
import { Shield, Edit, Trash2, X } from 'lucide-react';
import { roleService } from '../../services/roleService';
import EditRoleModal from './../../components/admin/EditRoleModal';

interface Role {
  roleId: number;
  roleName: string;
  description: string;
}

interface RoleManagementProps {
  onShowRoleModal: () => void;
  roles: Role[];
  loading: boolean;
  error?: string | null;
  refreshRoles: () => void;
}

const RoleManagement: React.FC<RoleManagementProps> = ({
  onShowRoleModal,
  roles,
  loading,
  error,
  refreshRoles,
}) => {
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const openEditModal = (role: Role) => setEditingRole(role);
  const closeEditModal = () => setEditingRole(null);

  const openDeleteModal = (role: Role) => {
    setRoleToDelete(role);
    setShowDeleteModal(true);
    setDeleteError(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setRoleToDelete(null);
    setDeletingId(null);
    setDeleteError(null);
  };

  const handleDelete = async () => {
    if (!roleToDelete) return;
    setDeletingId(roleToDelete.roleId);
    setDeleteError(null);
    try {
      await roleService.delete(roleToDelete.roleId);
      refreshRoles();
      closeDeleteModal();
    } catch (err: any) {
      setDeleteError(err?.message || 'Failed to delete role');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Role Management</h3>
          <button
            onClick={onShowRoleModal}
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 space-x-2"
          >
            <Shield className="h-4 w-4" />
            <span>Create Role</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Role Management</h3>
        <button
          onClick={onShowRoleModal}
          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 space-x-2"
        >
          <Shield className="h-4 w-4" />
          <span>Create Role</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      {deleteError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{deleteError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No roles found
          </div>
        ) : (
          roles.map((role) => (
            <div key={role.roleId} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                    title="Edit"
                    onClick={() => openEditModal(role)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-1 ${deletingId === role.roleId ? 'text-red-400' : 'text-gray-400'} hover:text-red-600 transition-colors`}
                    title="Delete"
                    onClick={() => openDeleteModal(role)}
                    disabled={deletingId === role.roleId}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{role.roleName}</h4>
              <p className="text-sm text-gray-600 mb-4">{role.description}</p>
              <div className="text-xs text-gray-500">
                Users with this role: <span className="font-medium">0</span>
              </div>
            </div>
          ))
        )}
      </div>
      <button
        onClick={refreshRoles}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        Refresh Roles
      </button>

      {/* Edit Modal */}
      {editingRole && (
        <EditRoleModal
          role={editingRole}
          onClose={closeEditModal}
          onSaved={refreshRoles}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && roleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
              onClick={closeDeleteModal}
              disabled={deletingId === roleToDelete.roleId}
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Role</h3>
            <p className="mb-6">Are you sure you want to delete the role <span className="font-bold">{roleToDelete.roleName}</span>?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={closeDeleteModal}
                disabled={deletingId === roleToDelete.roleId}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
                disabled={deletingId === roleToDelete.roleId}
              >
                {deletingId === roleToDelete.roleId ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;