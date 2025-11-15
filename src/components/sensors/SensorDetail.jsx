import React from 'react';
import { X, Droplets, Thermometer, Sun, Wind } from 'lucide-react';
import Modal from '../common/Modal';

const SensorDetail = ({ capteur, isOpen, onClose, latestData }) => {
  if (!capteur) return null;

  const sensors = [
    {
      label: 'Humidité du Sol',
      value: latestData?.humiditeSol || 'N/A',
      icon: Droplets,
      color: 'text-blue-600',
    },
    {
      label: 'Température',
      value: latestData?.temperatureAir ? `${latestData.temperatureAir.toFixed(1)}°C` : 'N/A',
      icon: Thermometer,
      color: 'text-red-600',
    },
    {
      label: 'Humidité Air',
      value: latestData?.humiditeAir ? `${latestData.humiditeAir.toFixed(1)}%` : 'N/A',
      icon: Wind,
      color: 'text-green-600',
    },
    {
      label: 'Luminosité',
      value: latestData?.luminosite || 'N/A',
      icon: Sun,
      color: 'text-yellow-600',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={capteur.nom} size="lg">
      <div className="space-y-6">
        {/* Informations du capteur */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Informations</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Type</p>
              <p className="font-medium text-gray-900">{capteur.type}</p>
            </div>
            <div>
              <p className="text-gray-600">Localisation</p>
              <p className="font-medium text-gray-900">{capteur.localisation || 'Non définie'}</p>
            </div>
            <div>
              <p className="text-gray-600">Adresse MAC</p>
              <p className="font-medium text-gray-900">{capteur.macAddress}</p>
            </div>
            <div>
              <p className="text-gray-600">État</p>
              <p className={`font-medium ${capteur.actif ? 'text-green-600' : 'text-red-600'}`}>
                {capteur.actif ? 'Actif' : 'Inactif'}
              </p>
            </div>
          </div>
        </div>

        {/* Dernières mesures */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Dernières Mesures</h4>
          <div className="grid grid-cols-2 gap-4">
            {sensors.map((sensor, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <sensor.icon className={`h-6 w-6 ${sensor.color}`} />
                  <div>
                    <p className="text-xs text-gray-600">{sensor.label}</p>
                    <p className="text-lg font-bold text-gray-900">{sensor.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SensorDetail;