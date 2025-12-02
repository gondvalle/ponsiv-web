import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Bonuses from './pages/Bonuses';
import Looks from './pages/Looks';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import ComingSoon from './pages/ComingSoon';
import AdminWaitlist from './pages/AdminWaitlist';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/admin-pnv-wl-2024" element={<AdminWaitlist />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/catalog" element={
            <ProtectedRoute>
              <Layout>
                <Catalog />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/bonuses" element={
            <ProtectedRoute>
              <Layout>
                <Bonuses />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/looks" element={
            <ProtectedRoute>
              <Layout>
                <Looks />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
