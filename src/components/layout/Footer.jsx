import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SmartPlant IA</h3>
            <p className="text-sm text-gray-600">
              Solution intelligente pour l'agriculture moderne.
              Surveillance en temps réel et détection automatique des maladies.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="text-sm text-gray-600 hover:text-primary-600">
                  Tableau de bord
                </a>
              </li>
              <li>
                <a href="/sensors" className="text-sm text-gray-600 hover:text-primary-600">
                  Capteurs
                </a>
              </li>
              <li>
                <a href="/analysis" className="text-sm text-gray-600 hover:text-primary-600">
                  Analyse IA
                </a>
              </li>
              <li>
                <a href="/settings" className="text-sm text-gray-600 hover:text-primary-600">
                  Paramètres
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>support@smartplant.tn</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Github className="h-4 w-4" />
                <a href="https://github.com" className="hover:text-primary-600">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} SmartPlant IA. Développé avec{' '}
            <Heart className="inline h-4 w-4 text-red-500" /> en Tunisie
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;