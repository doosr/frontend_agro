import React, { useState, useEffect, useRef } from 'react';
import { Power, Droplets, Calendar } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import api from '../../config/api';
import { toast } from 'react-toastify';

const IrrigationControl = ({ currentState, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [optimisticState, setOptimisticState] = useState(null);
  const optimisticTimer = useRef(null);

  // Utiliser l'état optimiste s'il existe, sinon l'état réel
  const displayState = optimisticState !== null ? optimisticState : currentState;

  // Surveiller currentState pour annuler l'optimiste quand les données réelles correspondent
  useEffect(() => {
    if (optimisticState !== null && currentState === optimisticState) {
      // Les données réelles correspondent à l'action demandée, on peut annuler l'optimiste
      setOptimisticState(null);
      if (optimisticTimer.current) {
        clearTimeout(optimisticTimer.current);
        optimisticTimer.current = null;
      }
    }
  }, [currentState, optimisticState]);

  const handleToggleIrrigation = async (action) => {
    const desiredState = action === 'ON';

    try {
      setLoading(true);
      // Mise à jour optimiste immédiate
      setOptimisticState(desiredState);

      const response = await api.post('/user/irrigation', { action });

      if (response.data && response.data.success) {
        toast.success(`Arrosage ${action === 'ON' ? 'activé' : 'désactivé'}`);
        onUpdate?.();

        // Timeout de sécurité prolongé (15s) si les données ne reviennent jamais
        if (optimisticTimer.current) clearTimeout(optimisticTimer.current);
        optimisticTimer.current = setTimeout(() => {
          console.log('⏰ Timeout optimiste - Annulation après 15s');
          setOptimisticState(null);
          optimisticTimer.current = null;
        }, 15000);
      } else {
        // En cas d'erreur, annuler l'état optimiste
        setOptimisticState(null);
        toast.error(response.data?.message || 'Erreur lors du contrôle de l\'arrosage');
      }
    } catch (error) {
      // En cas d'erreur, annuler l'état optimiste
      setOptimisticState(null);
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
              <div className={`h-4 w-4 rounded-full ${displayState ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="font-medium text-gray-900">
                État: {displayState ? 'Activé' : 'Désactivé'}
              </span>
            </div>
            <Power className={`h-6 w-6 ${displayState ? 'text-green-600' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Boutons */}
        <div className="flex justify-center">
          {!displayState ? (
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
