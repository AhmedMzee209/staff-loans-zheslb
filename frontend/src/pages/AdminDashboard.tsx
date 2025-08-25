import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import Layout from '../components/Layout';
import AdminOverview from './admin/AdminOverview';
import UserManagement from './admin/UserManagement';
import RoleManagement from './admin/RoleManagement';
import ApplicationsTable from './admin/ApplicationsTable';
import AuditLogs from './admin/AuditLogs';
import SystemSettings from './admin/SystemSettings';
import AddUserModal from './admin/AddUserModal';
import AddRoleModal from './admin/AddRoleModal';
import EditUserModal from './admin/EditUserModal';
import { roleService } from '../services/roleService';
import { userService } from '../services/userService';

const AdminDashboard: React.FC = () => {
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editUserError, setEditUserError] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    roleId: ''
  });
  const [userError, setUserError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  // const [newRole, setNewRole] = useState({ role_name: '', description: '' });

  // Role management state
  const [roles, setRoles] = useState<any[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [rolesError, setRolesError] = useState<string | null>(null);
  const [roleSubmitting, setRoleSubmitting] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'User Management' },
    { id: 'roles', label: 'Role Management' },
    { id: 'applications', label: 'Applications' },
    { id: 'audit', label: 'Audit Logs' },
    { id: 'settings', label: 'System Settings' }
  ];

  // Fetch roles from backend
  const fetchRoles = async () => {
    setRolesLoading(true);
    setRolesError(null);
    try {
      const data = await roleService.getAll();
      setRoles(data);
    } catch (error: any) {
      setRolesError(error?.message || 'Failed to load roles');
    }
    setRolesLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const fetchedUsers = await userService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setUsersError('Failed to load users');
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // User registration handler
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserError(null);
    try {
      const createdUser = await userService.createUser(newUser); // expects { email, password, roleId }
      setUsers((prev) => [createdUser, ...prev]);
      setShowUserModal(false);
      setNewUser({ email: '', password: '', roleId: '' });
      setUserError(null);
    } catch (error: any) {
      setUserError(error?.message || 'Failed to create user');
    }
  };

  // Handle create role with API call
  const handleCreateRole = async (role: { roleName: string; description: string }) => {
    setRoleSubmitting(true);
    try {
      await roleService.create(role);
  setShowRoleModal(false);
  fetchRoles();
    } catch (error: any) {
      setRolesError(error?.message || 'Failed to create role');
    } finally {
      setRoleSubmitting(false);
    }
  };

  const handleEditUser = (user: User) => {
    // Map user to include top-level roleId for modal compatibility
    setEditUser({ ...(user as any), roleId: user.role?.roleId || '' });
    setShowEditUserModal(true);
    setEditUserError(null);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    setEditUserError(null);
    try {
      const updated = await userService.updateUser({
        id: editUser.userId,
        email: editUser.email,
        roleId: (editUser as any).roleId // use top-level roleId from modal
      });
      setUsers((prev) => prev.map(u => u.userId === updated.userId ? updated : u));
      setShowEditUserModal(false);
      setEditUser(null);
    } catch (error: any) {
      setEditUserError(error?.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!window.confirm(`Are you sure you want to delete user ${user.email}?`)) return;
    try {
      await userService.deleteUser(user.userId);
      setUsers((prev) => prev.filter(u => u.userId !== user.userId));
    } catch (error: any) {
      alert(error?.message || 'Failed to delete user');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview onShowUserModal={() => setShowUserModal(true)} onShowRoleModal={() => setShowRoleModal(true)} />;
      case 'users':
        return (
          <UserManagement
            onShowUserModal={() => setShowUserModal(true)}
            users={users}
            loading={usersLoading}
            error={usersError}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        );
      case 'roles':
        return (
          <RoleManagement
            onShowRoleModal={() => setShowRoleModal(true)}
            roles={roles}
            loading={rolesLoading}
            error={rolesError}
            refreshRoles={fetchRoles}
          />
        );
      case 'applications':
        return <ApplicationsTable />;
      case 'audit':
        return <AuditLogs />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminOverview onShowUserModal={() => setShowUserModal(true)} onShowRoleModal={() => setShowRoleModal(true)} />;
    }
  };
      {/* Edit User Modal */}
      <EditUserModal
        open={showEditUserModal}
        user={editUser}
        setUser={setEditUser}
        onClose={() => {
          setShowEditUserModal(false);
          setEditUser(null);
          setEditUserError(null);
        }}
        onSubmit={handleUpdateUser}
        roles={roles}
        error={editUserError}
      />

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        {/* Tab Content */}
        {renderContent()}
        {/* Edit User Modal */}
        <EditUserModal
          open={showEditUserModal}
          user={editUser}
          setUser={setEditUser}
          onClose={() => {
            setShowEditUserModal(false);
            setEditUser(null);
            setEditUserError(null);
          }}
          onSubmit={handleUpdateUser}
          roles={roles}
          error={editUserError}
        />
        {/* Add User Modal */}
        <AddUserModal
          open={showUserModal}
          newUser={newUser}
          setNewUser={setNewUser}
          onClose={() => {
            setShowUserModal(false);
            setUserError(null);
          }}
          onSubmit={handleCreateUser}
          roles={roles}
          error={userError}
        />
        {/* Add Role Modal */}
        <AddRoleModal
          open={showRoleModal}
          onClose={() => setShowRoleModal(false)}
          onSubmit={handleCreateRole}
          loading={roleSubmitting}
        />
      </div>
    </Layout>
  );
};

export default AdminDashboard;