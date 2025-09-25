import React, { useState, useEffect } from 'react';
import { X, Shield, Users, Crown, Check, AlertCircle } from 'lucide-react';
import { userRoleService, type UserWithRoles } from '../../services/userRoleService';
import type { RoleInfo } from '../../types';
import { ROLE_COLORS, ROLE_DISPLAY_NAMES } from '../../constants/roles';

interface MultiRoleAssignmentModalProps {
  user: UserWithRoles;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedUser: UserWithRoles) => void;
}

const MultiRoleAssignmentModal: React.FC<MultiRoleAssignmentModalProps> = ({
  user,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [availableRoles, setAvailableRoles] = useState<RoleInfo[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [primaryRoleId, setPrimaryRoleId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load available roles and initialize selections
  useEffect(() => {
    if (isOpen) {
      loadAvailableRoles();
      initializeSelections();
    }
  }, [isOpen, user]);

  const loadAvailableRoles = async () => {
    try {
      setLoading(true);
      const roles = await userRoleService.getAllRoles();
      setAvailableRoles(roles);
    } catch (err) {
      console.error('Error loading roles:', err);
      setError('Failed to load available roles');
    } finally {
      setLoading(false);
    }
  };

  const initializeSelections = () => {
    // Pre-select current user roles
    const currentRoleIds = user.roles
      .filter(roleDetail => roleDetail.isActive)
      .map(roleDetail => roleDetail.role.roleId);
    
    setSelectedRoleIds(currentRoleIds);
    
    // Set primary role if exists
    if (user.primaryRole) {
      setPrimaryRoleId(user.primaryRole.roleId);
    } else if (currentRoleIds.length > 0) {
      // Default to first role if no primary role set
      setPrimaryRoleId(currentRoleIds[0]);
    }

    // Ensure STAFF role is always selected (as per user requirements)
    const staffRole = availableRoles.find(role => role.roleName === 'STAFF');
    if (staffRole && !currentRoleIds.includes(staffRole.roleId)) {
      setSelectedRoleIds(prev => [...prev, staffRole.roleId]);
      if (!primaryRoleId) {
        setPrimaryRoleId(staffRole.roleId);
      }
    }
  };

  const handleRoleToggle = (roleId: string, roleName: string) => {
    if (roleName === 'STAFF') {
      // STAFF role cannot be removed as per user requirements
      return;
    }

    setSelectedRoleIds(prev => {
      const newSelection = prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId];

      // If removing the primary role, set a new primary
      if (prev.includes(roleId) && primaryRoleId === roleId && newSelection.length > 0) {
        // Default to STAFF if available, otherwise first remaining role
        const staffRole = availableRoles.find(role => role.roleName === 'STAFF');
        const staffRoleId = staffRole?.roleId;
        if (staffRoleId && newSelection.includes(staffRoleId)) {
          setPrimaryRoleId(staffRoleId);
        } else {
          setPrimaryRoleId(newSelection[0]);
        }
      }

      return newSelection;
    });
  };

  const handlePrimaryRoleChange = (roleId: string) => {
    if (selectedRoleIds.includes(roleId)) {
      setPrimaryRoleId(roleId);
    }
  };

  const handleSave = async () => {
    if (selectedRoleIds.length === 0) {
      setError('At least one role must be selected');
      return;
    }

    if (!primaryRoleId || !selectedRoleIds.includes(primaryRoleId)) {
      setError('Primary role must be one of the selected roles');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const updatedUser = await userRoleService.assignRolesToUser({
        userId: user.userId,
        roleIds: selectedRoleIds,
        primaryRoleId: primaryRoleId,
      });

      onSuccess(updatedUser);
      onClose();
    } catch (err: any) {
      console.error('Error assigning roles:', err);
      setError(err?.message || 'Failed to assign roles');
    } finally {
      setSaving(false);
    }
  };

  const getRoleColor = (roleName: string): string => {
    return ROLE_COLORS[roleName as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800';
  };

  const getRoleDisplayName = (roleName: string): string => {
    return ROLE_DISPLAY_NAMES[roleName as keyof typeof ROLE_DISPLAY_NAMES] || roleName;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-emerald-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Assign Roles</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Info Message */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Role Assignment Rules</h4>
            </div>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• All users must have the STAFF role (cannot be removed)</li>
              <li>• You can assign additional roles like CEO, ADMIN, etc.</li>
              <li>• Select a primary role for dashboard navigation</li>
            </ul>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Available Roles</h4>
              
              {availableRoles.map(role => {
                const isSelected = selectedRoleIds.includes(role.roleId);
                const isPrimary = primaryRoleId === role.roleId;
                const isStaff = role.roleName === 'STAFF';
                const colorClass = getRoleColor(role.roleName);

                return (
                  <div
                    key={role.roleId}
                    className={`relative p-4 border-2 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    } ${isStaff ? 'ring-2 ring-emerald-200' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleRoleToggle(role.roleId, role.roleName)}
                            disabled={isStaff || saving}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600'
                                : 'border-gray-300 hover:border-blue-400'
                            } ${isStaff ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                          >
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </button>
                          
                          <div className="flex items-center space-x-3">
                            <Shield className="h-5 w-5 text-gray-500" />
                            <div>
                              <h5 className="font-medium text-gray-900">
                                {getRoleDisplayName(role.roleName)}
                                {isStaff && <span className="ml-2 text-emerald-600 text-sm">(Required)</span>}
                              </h5>
                              <p className="text-sm text-gray-600">{role.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Role Badge */}
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
                          {role.roleName}
                        </span>

                        {/* Primary Role Toggle */}
                        {isSelected && (
                          <button
                            onClick={() => handlePrimaryRoleChange(role.roleId)}
                            disabled={saving}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                              isPrimary
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700'
                            }`}
                          >
                            <Crown className="h-3 w-3" />
                            <span>{isPrimary ? 'Primary' : 'Set Primary'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading || selectedRoleIds.length === 0}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                <span>Assign Roles</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiRoleAssignmentModal;