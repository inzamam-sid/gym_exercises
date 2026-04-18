import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
//import { AuthProvider } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
//import Login from './pages/auth/Login';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
//import MemberDashboard from './pages/member/MemberDashboard';
import MemberDashboard from './pages/member/MemberDashboard';
import Layout from './components/layout/Layout';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/member/*" element={
        <ProtectedRoute allowedRoles={['member']}>
          <Layout>
            <Routes>
              <Route path="dashboard" element={<MemberDashboard />} />
              <Route path="*" element={<Navigate to="/member/dashboard" />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/" element={
        user ? (
          user.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/member/dashboard" />
        ) : (
          <Navigate to="/login" />
        )
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;