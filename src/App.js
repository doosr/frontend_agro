import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import SocketService from './services/userService';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import Sensors from './pages/Sensors';
import Irrigation from './pages/Irrigation';
import Analysis from './pages/Analysis';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Users from './pages/Users';
import CapteursAdmin from './pages/CapteursAdmin';
import Loader from './components/common/Loader';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Chargement..." />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/dashboard" />;

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Chargement..." />
      </div>
    );
  }

  if (user) return <Navigate to="/app/dashboard" />;

  return children;
};

function App() {
  const { user, loading } = useAuth();

  // ⚡ Connecter la socket une seule fois après que l'utilisateur est chargé
  useEffect(() => {
    if (!loading && user) {
      SocketService.connect(user._id);
    }
    // NE PAS déconnecter ici pour garder la socket persistante
  }, [user, loading]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Routes publiques */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Routes protégées */}
        <Route path="/app" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/app/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="irrigation" element={<Irrigation />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          
          {/* Routes Admin */}
          <Route path="users" element={<PrivateRoute requireAdmin><Users /></PrivateRoute>} />
          <Route path="capteurs-admin" element={<PrivateRoute requireAdmin><CapteursAdmin /></PrivateRoute>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
