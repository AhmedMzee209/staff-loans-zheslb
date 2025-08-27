import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { authService } from './services';
import Login from './components/Login';

// Dashboard imports
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import HODDashboard from './pages/HODDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AccountantDashboard from './pages/AccountantDashboard';
import AuditorDashboard from './pages/AuditorDashboard';
import CEODashboard from './pages/CEODashboard';
import CODashboard from './pages/CODashboard';


// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role.roleName)) {
    // Redirect to appropriate dashboard based on user role
    const dashboardPath = authService.getDashboardPath();
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

// Role-based Route Component
const RoleRoute: React.FC<{ role: string; children: React.ReactNode }> = ({ 
  role, 
  children 
}) => {
  return (
    <ProtectedRoute allowedRoles={[role]}>
      {children}
    </ProtectedRoute>
  );
};


// Main App Component
const AppContent: React.FC = () => {
  // Always show login page at root path
  return <Login />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Role-based dashboard routes */}
          <Route 
            path="/admin" 
            element={
              <RoleRoute role="ADMIN">
                <AdminDashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/staff" 
            element={
              <RoleRoute role="STAFF">
                <StaffDashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/hod" 
            element={
              <RoleRoute role="HOD">
                <HODDashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/manager" 
            element={
              <RoleRoute role="MANAGER">
                <ManagerDashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/accountant" 
            element={
              <RoleRoute role="ACCOUNTANT">
                <AccountantDashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/auditor" 
            element={
              <RoleRoute role="AUDITOR">
                <AuditorDashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/ceo" 
            element={
              <RoleRoute role="CEO">
                <CEODashboard />
              </RoleRoute>
            } 
          />
          
          <Route 
            path="/co" 
            element={
              <RoleRoute role="CO">
                <CODashboard />
              </RoleRoute>
            } 
          />
        
          
          {/* Default route - always show login page */}
          <Route path="/" element={<Login />} />

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;