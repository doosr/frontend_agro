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
      await api.post('/user/irrigation', { action });
      toast.success(`Arrosage ${action === 'ON' ? 'activé' : 'désactivé'}`);
      onUpdate?.();
    } catch (error) {
      toast.error('Erreur lors du contrôle de l\'arrosage');
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

        {/* Boutons de contrôle */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={currentState ? 'secondary' : 'success'}
            onClick={() => handleToggleIrrigation('ON')}
            loading={loading}
            disabled={currentState}
            className="w-full"
          >
            Démarrer
          </Button>
          <Button
            variant={!currentState ? 'secondary' : 'danger'}
            onClick={() => handleToggleIrrigation('OFF')}
            loading={loading}
            disabled={!currentState}
            className="w-full"
          >
            Arrêter
          </Button>
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
