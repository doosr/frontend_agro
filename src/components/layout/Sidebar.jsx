import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplets, 
  Image, 
  Activity, 
  Settings, 
  Users,
  Radio,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/app/dashboard', icon: LayoutDashboard, label: 'Tableau de bord', roles: [ 'agriculteur'] },
    { path: '/app/sensors', icon: Activity, label: 'Capteurs', roles: [ 'agriculteur'] },
    { path: '/app/irrigation', icon: Droplets, label: 'Irrigation', roles: ['agriculteur'] },
    { path: '/app/analysis', icon: Image, label: 'Analyse IA', roles: ['agriculteur'] },
    { path: '/app/capteurs-admin', icon: Radio, label: 'Gestion Capteurs', roles: ['admin'] },
    { path: '/app/users', icon: Users, label: 'Utilisateurs', roles: ['admin'] },
    { path: '/app/settings', icon: Settings, label: 'Paramètres', roles: [ 'agriculteur'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay Mobile - FIX: utiliser isOpen au lieu de isMenuOpen */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Header Mobile */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b">
            <span className="text-lg font-bold text-gray-900">Menu</span>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredMenu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                  ${isActive(item.path)
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-primary-50 rounded-lg p-4">
              <p className="text-sm font-medium text-primary-900">Aide & Support</p>
              <p className="text-xs text-primary-700 mt-1">
                Besoin d'aide ? Contactez le support
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;