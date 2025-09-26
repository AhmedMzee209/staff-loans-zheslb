import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login: contextLogin, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && user.role) {
      try {
        // Use your dashboard path logic for role-based dashboards
        const dashboardPath = authService.getDashboardPath();
        if (dashboardPath && dashboardPath !== '/login') {
          navigate(dashboardPath, { replace: true });
        }
      } catch (error) {
        console.error('Error getting dashboard path:', error);
        // Fallback based on user role
        const roleName = user.role.roleName?.toLowerCase();
        if (roleName) {
          navigate(`/${roleName}`, { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login({ email, password });
      if (response && response.accessToken && response.user) {
        contextLogin(response.user, response.accessToken);
        try {
          const dashboardPath = authService.getDashboardPath();
          navigate(dashboardPath, { replace: true });
        } catch (error) {
          console.error('Error getting dashboard path after login:', error);
          // Fallback based on user role
          const roleName = response.user.role?.roleName?.toLowerCase();
          if (roleName) {
            navigate(`/${roleName}`, { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left panel (Info) */}
        <div className="relative hidden md:flex items-center justify-center p-10 overflow-hidden bg-gradient-to-br from-cyan-700 to-cyan-900 text-white">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0, transparent 40%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.10) 0, transparent 40%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.10) 0, transparent 40%)"
          }} />

          <div className="relative max-w-xl">
            <h1 className="text-2xl font-extrabold text-yellow-300 tracking-tight">STAFF LOAN APPLICATION PORTAL</h1>

            <div className="mt-10 space-y-7">
              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-yellow-300 mt-0.5" />
                <div className="ml-3">
                  <p className="font-semibold">New Loan Application?</p>
                  <p className="text-blue-50/90">Apply using your Staff ID and required personal details.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-yellow-300 mt-0.5" />
                <div className="ml-3">
                  <p className="font-semibold">Document Submission</p>
                  <p className="text-blue-50/90">Upload supporting documents securely to complete your request.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-yellow-300 mt-0.5" />
                <div className="ml-3">
                  <p className="font-semibold">Track Approval Stages</p>
                  <p className="text-blue-50/90">Monitor progress from submission to final approval.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Login card */}
        <div className="h-full flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            {/* Logo / brand */}
            <div className="flex flex-col items-center mb-6">
              <div className="h-32 w-32 rounded-full overflow-hidden ring-2 ring-blue-400/20 shadow-inner bg-white flex items-center justify-center">
                <LogIn className="h-16 w-16 text-blue-600" />
              </div>
              <p className="mt-2  text-xl text-yellow-400">Staff Loan Management System</p>
            </div>

            <div className="bg-white">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-yellow-300 mb-2">
                    Email Address*
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-300" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-yellow-300 mb-2">
                    Password*
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm text-yellow-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-700 hover:underline">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-600  to-cyan-800 hover:from-cyan-700 hover:to-emerald-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>{isLoading ? 'Signing in...' : 'SIGN IN'}</span>
                </button>
              </form>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Contact your system administrator if you need access to the system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;