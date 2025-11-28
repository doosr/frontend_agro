import React from 'react';
import IrrigationControl from '../components/irrigation/IrrigationControl';
import ThresholdSettings from '../components/irrigation/ThresholdSettings';
import IrrigationHistory from '../components/irrigation/IrrigationHistory';
import { useSensorData } from '../hooks/useSensorData';
import { useAuth } from '../context/AuthContext';

const Irrigation = () => {
  const { latestData, refetch } = useSensorData();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion de l'Irrigation</h1>
        <p className="text-gray-600 mt-2">Contrôlez et configurez votre système d'arrosage</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IrrigationControl
          currentState={latestData?.etatPompe === 1}
          onUpdate={refetch}
        />
        <ThresholdSettings initialSettings={user} />
      </div>

      <IrrigationHistory />
    </div>
  );
};

export default Irrigation;
