import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Bell } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import { toast } from 'react-toastify';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [settings, setSettings] = useState({
    seuilHumiditeSol: user?.seuilHumiditeSol || 500,
    arrosageAutomatique: user?.arrosageAutomatique ?? true,
    notificationsEnabled: user?.notificationsEnabled ?? true
  });
  const [loading, setLoading] = useState(false);

  // ✅ Synchroniser les settings avec le user quand il change
  useEffect(() => {
    if (user) {
      setSettings({
        seuilHumiditeSol: user.seuilHumiditeSol || 500,
        arrosageAutomatique: user.arrosageAutomatique ?? true,
        notificationsEnabled: user.notificationsEnabled ?? true
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await api.put('/user/settings', settings);
      
      // ✅ Mettre à jour le contexte utilisateur
      if (response.data && response.data.user) {
        updateUser(response.data.user);
        toast.success('✅ Paramètres sauvegardés avec succès');
      } else {
        toast.success('✅ Paramètres sauvegardés');
      }
    } catch (error) {
      console.error('Erreur sauvegarde paramètres:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Erreur lors de la sauvegarde';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-2">Gérez vos préférences et configurations</p>
      </div>

      <Card title="Irrigation" icon={SettingsIcon}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Seuil d'humidité du sol
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="4095"
                value={settings.seuilHumiditeSol}
                onChange={(e) =>
                  setSettings({ ...settings, seuilHumiditeSol: parseInt(e.target.value) })
                }
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xl font-bold text-primary-600 min-w-[80px]">
                {settings.seuilHumiditeSol}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Déclenchement automatique en dessous de cette valeur
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Mode Automatique</p>
              <p className="text-sm text-gray-600">Activer l'arrosage automatique</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.arrosageAutomatique}
                onChange={(e) =>
                  setSettings({ ...settings, arrosageAutomatique: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </Card>

      <Card title="Notifications" icon={Bell}>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Notifications Push</p>
            <p className="text-sm text-gray-600">Recevoir des alertes en temps réel</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) =>
                setSettings({ ...settings, notificationsEnabled: e.target.checked })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </Card>

      <Button
        variant="primary"
        icon={Save}
        onClick={handleSave}
        loading={loading}
        className="w-full"
      >
        Enregistrer les modifications
      </Button>
    </div>
  );
};

export default Settings;