import React, { useState, useEffect } from 'react';
import { History, Droplets, Clock } from 'lucide-react';
import Card from '../common/Card';
import api from '../../config/api';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const IrrigationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
    // Rafraîchir toutes les minutes
    const interval = setInterval(fetchHistory, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/irrigation/history');
      if (response.data && response.data.success) {
        setHistory(response.data.data);
      }
    } catch (error) {
      console.error('Erreur chargement historique:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && history.length === 0) {
    return (
      <Card title="Historique d'Arrosage" icon={History}>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card title="Historique d'Arrosage" icon={History}>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <History className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>Aucun historique disponible</p>
          </div>
        ) : (
          history.map((event) => (
            <div
              key={event._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${event.action === 'ON'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-200 text-gray-600'
                  }`}>
                  <Droplets className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Arrosage {event.action === 'ON' ? 'Démarré' : 'Arrêté'}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${event.source === 'AUTO'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-100 text-purple-700'
                      }`}>
                      {event.source === 'AUTO' ? 'AUTOMATIQUE' : 'MANUEL'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-xs text-gray-500" title={new Date(event.timestamp).toLocaleString()}>
                <Clock className="h-3 w-3 mr-1" />
                {formatDistanceToNow(new Date(event.timestamp), {
                  addSuffix: true,
                  locale: fr
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default IrrigationHistory;
