import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

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
  console.log('PrivateRoute user:', user);  // Debugging

  // Si les données sont en cours de chargement, afficher un Loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Chargement..." />
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si l'admin est requis mais que l'utilisateur n'est pas un admin, rediriger
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // Si tout est OK, afficher les enfants
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

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Routes publiques */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

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