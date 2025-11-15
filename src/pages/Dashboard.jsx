// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Droplets, Thermometer, Wind, Sun } from 'lucide-react';
import SensorCard from '../components/dashboard/SensorCard';
import ChartWidget from '../components/dashboard/ChartWidget';
import AlertPanel from '../components/dashboard/AlertPanel';
import Loader from '../components/common/Loader';
import { useSensorData } from '../hooks/useSensorData';
import { useAlerts } from '../hooks/useAlerts';
import sensorService from '../services/sensorService';

const Dashboard = () => {
  const { latestData, loading: sensorLoading } = useSensorData();
  const { alerts, markAsRead } = useAlerts();
  const [historicalData, setHistoricalData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [historyResponse, statsResponse] = await Promise.all([
        sensorService.getSensorData({ limit: 20 }),
        sensorService.getStats('24h')
      ]);

      setHistoricalData(historyResponse.data.reverse());
      setStats(statsResponse.stats);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || sensorLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" text="Chargement du tableau de bord..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de votre système SmartPlant</p>
      </div>

      {/* Cartes de capteurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SensorCard
          title="Humidité du Sol"
          value={latestData?.humiditeSol || 0}
          unit=""
          icon={Droplets}
          color="blue"
        />
        <SensorCard
          title="Température"
          value={latestData?.temperatureAir?.toFixed(1) || 0}
          unit="°C"
          icon={Thermometer}
          color="red"
        />
        <SensorCard
          title="Humidité de l'Air"
          value={latestData?.humiditeAir?.toFixed(1) || 0}
          unit="%"
          icon={Wind}
          color="green"
        />
        <SensorCard
          title="Luminosité"
          value={latestData?.luminosite || 0}
          unit=""
          icon={Sun}
          color="yellow"
        />
      </div>

      {/* Graphiques et Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartWidget
            data={historicalData}
            title="Évolution des Paramètres (24h)"
            dataKeys={[
              { key: 'humiditeSol', name: 'Humidité Sol' },
              { key: 'temperatureAir', name: 'Température' },
              { key: 'humiditeAir', name: 'Humidité Air' }
            ]}
          />
        </div>
        <div>
          <AlertPanel alerts={alerts} onMarkAsRead={markAsRead} />
        </div>
      </div>

      {/* Statistiques */}
      {stats && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques (24h)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Humidité Sol Moyenne</p>
              <p className="text-2xl font-bold text-primary-600">
                {stats.avgHumiditeSol?.toFixed(0) || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Temp. Moyenne</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.avgTemperature?.toFixed(1) || 0}°C
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Humidité Air Moyenne</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.avgHumiditeAir?.toFixed(1) || 0}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Luminosité Moyenne</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.avgLuminosite?.toFixed(0) || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 