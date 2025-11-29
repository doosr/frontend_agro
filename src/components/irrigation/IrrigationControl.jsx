import React, { useState } from 'react';
import { Power, Droplets, Calendar } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import api from '../../config/api';
import { toast } from 'react-toastify';

const IrrigationControl = ({ currentState, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleToggleIrrigation = async (action) => {
    try {
      setLoading(true);
      const response = await api.post('/user/irrigation', { action });

      if (response.data && response.data.success) {
        toast.success(`Arrosage ${action === 'ON' ? 'activé' : 'désactivé'}`);
        onUpdate?.();
      } else {
        toast.error(response.data?.message || 'Erreur lors du contrôle de l\'arrosage');
      }
    } catch (error) {
      console.error('Erreur irrigation:', error);
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Erreur lors du contrôle de l\'arrosage';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Contrôle Manuel" icon={Droplets}>
      <div className="space-y-6">

        {/* État actuel */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`h-4 w-4 rounded-full ${currentState ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="font-medium text-gray-900">
                État: {currentState ? 'Activé' : 'Désactivé'}
              </span>
            </div>
            <Power className={`h-6 w-6 ${currentState ? 'text-green-600' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Boutons */}
        <div className="flex justify-center">
          {!currentState ? (
            <Button
              variant="success"
              onClick={() => handleToggleIrrigation('ON')}
              loading={loading}
              className="w-full max-w-xs"
            >
              Démarrer l'arrosage
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => handleToggleIrrigation('OFF')}
              loading={loading}
              className="w-full max-w-xs"
            >
              Arrêter l'arrosage
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Mode manuel activé</p>
              <p className="text-xs text-blue-700 mt-1">
                Le système automatique est temporairement désactivé. N'oubliez pas de réactiver le mode automatique après utilisation.
              </p>
            </div>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default IrrigationControl;
