import React, { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2, Eye, Shield, Crown, Users } from 'lucide-react';
import { userRoleService, type UserWithRoles } from '../../services/userRoleService';
import MultiRoleAssignmentModal from '../../components/admin/MultiRoleAssignmentModal';
import { ROLE_COLORS, ROLE_DISPLAY_NAMES } from '../../constants/roles';
import type { User } from '../../types';

interface UserManagementProps {
  onShowUserModal: () => void;
  users: User[];
  loading: boolean;
  error: string | null;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onShowUserModal, loading, error, onEditUser, onDeleteUser }) => {
  const [usersWithRoles, setUsersWithRoles] = useState<UserWithRoles[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [roleError, setRoleError] = useState<string | null>(null);
  const [selectedUserForRoles, setSelectedUserForRoles] = useState<UserWithRoles | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Load users with their roles
  useEffect(() => {
    loadUsersWithRoles();
  }, []);

  const loadUsersWithRoles = async () => {
    try {
      setLoadingRoles(true);
      setRoleError(null);
      const usersWithRolesData = await userRoleService.getAllUsersWithRoles();
      setUsersWithRoles(usersWithRolesData);
    } catch (err: any) {
      console.error('Error loading users with roles:', err);
      setRoleError(err?.message || 'Failed to load user roles');
    } finally {
      setLoadingRoles(false);
    }
  };

  const handleManageRoles = (user: UserWithRoles) => {
    setSelectedUserForRoles(user);
    setIsRoleModalOpen(true);
  };

  const handleRoleAssignmentSuccess = (updatedUser: UserWithRoles) => {
    setUsersWithRoles(prev => 
      prev.map(user => 
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
    setIsRoleModalOpen(false);
    setSelectedUserForRoles(null);
  };

  const getRoleColor = (roleName: string): string => {
    return ROLE_COLORS[roleName as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800';
  };

  const getRoleDisplayName = (roleName: string): string => {
    return ROLE_DISPLAY_NAMES[roleName as keyof typeof ROLE_DISPLAY_NAMES] || roleName;
  };

  const renderRoleBadges = (user: UserWithRoles) => {
    const activeRoles = user.roles.filter(roleDetail => roleDetail.isActive);
    
    if (activeRoles.length === 0) {
      return <span className="text-gray-400 text-sm">No roles assigned</span>;
    }

    return (
      <div className="flex flex-wrap gap-1">
        {activeRoles.map(roleDetail => {
          const isPrimary = user.primaryRole?.roleId === roleDetail.role.roleId;
          const colorClass = getRoleColor(roleDetail.role.roleName);
          
          return (
            <span
              key={roleDetail.userRoleId}
              className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${colorClass} ${
                isPrimary ? 'ring-2 ring-yellow-300' : ''
              }`}
            >
              {isPrimary && <Crown className="h-3 w-3" />}
              <span>{getRoleDisplayName(roleDetail.role.roleName)}</span>
            </span>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">User Management</h3>
          <button
            onClick={onShowUserModal}
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">User Management</h3>
        <button
          onClick={onShowUserModal}
          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Show role loading error if any */}
      {roleError && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-600">Role information may be incomplete: {roleError}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loadingRoles ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading users with roles...</span>
                    </div>
                  </td>
                </tr>
              ) : usersWithRoles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                usersWithRoles.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-xs text-gray-500">ID: {user.userId.slice(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {renderRoleBadges(user)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.primaryRole ? (
                        <div className="flex items-center space-x-1">
                          <Crown className="h-4 w-4 text-yellow-500" />
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.primaryRole.roleName)}`}>
                            {getRoleDisplayName(user.primaryRole.roleName)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">None set</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-purple-600 transition-colors" 
                          title="Manage Roles"
                          onClick={() => handleManageRoles(user)}
                        >
                          <Users className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors" 
                          title="Edit User"
                          onClick={() => {
                            // Convert UserWithRoles to User for compatibility
                            const legacyUser: User = {
                              userId: user.userId,
                              email: user.email,
                              role: user.primaryRole || { roleId: '', roleName: '', description: '' },
                              isActive: user.isActive,
                              createdAt: user.createdAt
                            };
                            onEditUser(legacyUser);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors" 
                          title="Delete User"
                          onClick={() => {
                            // Convert UserWithRoles to User for compatibility
                            const legacyUser: User = {
                              userId: user.userId,
                              email: user.email,
                              role: user.primaryRole || { roleId: '', roleName: '', description: '' },
                              isActive: user.isActive,
                              createdAt: user.createdAt
                            };
                            onDeleteUser(legacyUser);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-Role Assignment Modal */}
      {selectedUserForRoles && (
        <MultiRoleAssignmentModal
          user={selectedUserForRoles}
          isOpen={isRoleModalOpen}
          onClose={() => {
            setIsRoleModalOpen(false);
            setSelectedUserForRoles(null);
          }}
          onSuccess={handleRoleAssignmentSuccess}
        />
      )}
    </div>
  );
};

export default UserManagement;