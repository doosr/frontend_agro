import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAlerts } from '../../hooks/useAlerts';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import AdminNotifications from '../admin/AdminNotifications';

const Navbar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { unreadCount } = useAlerts();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et Menu Mobile */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/app/Dashboard" className="flex items-center space-x-3 ml-2 lg:ml-0">
              <div className="bg-primary-600 p-2 rounded-lg">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">SmartPlant IA</span>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* Admin Notifications (seulement pour les admins) */}
            {user?.role === 'admin' && <AdminNotifications />}

            {/* Notifications Standard (seulement pour les non-admins) */}
            {user?.role !== 'admin' && (
              <Link
                to="/app/alerts"
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            )}

            {/* Menu Utilisateur */}
            <div className="relative">
              {user?.role === 'admin' ? (
                // Pour les admins : cliquer sur l'avatar redirige vers la gestion des utilisateurs
                <Link
                  to="/app/users"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="bg-primary-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-semibold">
                    {user?.nom?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.nom}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </Link>
              ) : (
                // Pour les agriculteurs : menu déroulant
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="bg-primary-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-semibold">
                      {user?.nom?.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user?.nom}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                  </button>

                  {/* Dropdown Menu pour agriculteurs */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <Link
                        to="/app/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        {t('navbar.myProfile')}
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        {t('navbar.logout')}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;