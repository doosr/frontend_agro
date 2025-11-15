import React, { useState, useEffect } from 'react';
import { Droplets } from 'lucide-react';
import IrrigationControl from '../components/irrigation/IrrigationControl';
import ThresholdSettings from '../components/irrigation/ThresholdSettings';
import Card from '../components/common/Card';
import { useSensorData } from '../hooks/useSensorData';
import { useAuth } from '../context/AuthContext';

const Irrigation = () => {
  const { latestData } = useSensorData();
  const { user } = useAuth();
  const [irrigationHistory, setIrrigationHistory] = useState([]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion de l'Irrigation</h1>
        <p className="text-gray-600 mt-2">Contrôlez et configurez votre système d'arrosage</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IrrigationControl
          currentState={latestData?.etatPompe === 1}
          onUpdate={() => {}}
        />
        <ThresholdSettings initialSettings={user} />
      </div>

      <Card title="Historique d'Irrigation" icon={Droplets}>
        <div className="space-y-3">
          {irrigationHistory.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucun historique disponible</p>
          ) : (
            irrigationHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-600">{new Date(item.timestamp).toLocaleString('fr-FR')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.type === 'auto' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  {item.type === 'auto' ? 'Automatique' : 'Manuel'}
                </span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Irrigation;