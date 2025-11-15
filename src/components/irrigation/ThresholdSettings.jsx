import React, { useState, useEffect } from 'react';
import { Settings, Save } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';
import api from '../../config/api';
import { toast } from 'react-toastify';

const ThresholdSettings = ({ initialSettings }) => {
  const [settings, setSettings] = useState({
    seuilHumiditeSol: 500,
    arrosageAutomatique: true,
    notificationsEnabled: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put('/user/settings', settings);
      toast.success('Paramètres enregistrés avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Paramètres d'Irrigation" icon={Settings}>
      <div className="space-y-6">
        {/* Seuil d'humidité */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seuil d'humidité du sol
          </label>
          <div className="flex items-center space-x-4">
            <Input
              type="range"
              min="0"
              max="4095"
              value={settings.seuilHumiditeSol}
              onChange={(e) => setSettings({ ...settings, seuilHumiditeSol: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-lg font-semibold text-primary-600 min-w-[80px]">
              {settings.seuilHumiditeSol}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            L'arrosage se déclenchera automatiquement si la valeur est inférieure à ce seuil
          </p>
        </div>

        {/* Arrosage automatique */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Arrosage Automatique</p>
            <p className="text-sm text-gray-600">Activer l'irrigation automatique</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.arrosageAutomatique}
              onChange={(e) => setSettings({ ...settings, arrosageAutomatique: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Notifications</p>
            <p className="text-sm text-gray-600">Recevoir des alertes en temps réel</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        {/* Bouton Sauvegarder */}
        <Button
          variant="primary"
          icon={Save}
          onClick={handleSave}
          loading={loading}
          className="w-full"
        >
          Enregistrer les paramètres
        </Button>
      </div>
    </Card>
  );
};

export default ThresholdSettings;
