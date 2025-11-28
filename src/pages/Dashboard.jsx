import React, { useState, useEffect } from 'react';
import { Droplets, Thermometer, Wind, Sun } from 'lucide-react';
import SensorCard from '../components/dashboard/SensorCard';
import ChartWidget from '../components/dashboard/ChartWidget';
import AlertPanel from '../components/dashboard/AlertPanel';
import Loader from '../components/common/Loader';
import { useSensorData } from '../hooks/useSensorData';
import { useAlerts } from '../hooks/useAlerts';
import sensorService from '../services/sensorService';
import { useTranslation } from 'react-i18next';
import IrrigationHistory from '../components/irrigation/IrrigationHistory';

const Dashboard = () => {
  const { t } = useTranslation();
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
        <Loader size="lg" text={t('dashboard.loading')} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <p className="text-gray-600 mt-2">{t('dashboard.subtitle')}</p>
      </div>

      {/* Cartes de capteurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SensorCard
          title={t('dashboard.soilHumidity')}
          value={latestData?.humiditeSol || 0}
          unit=""
          icon={Droplets}
          color="blue"
        />
        <SensorCard
          title={t('dashboard.temperature')}
          value={latestData?.temperatureAir?.toFixed(1) || 0}
          unit="°C"
          icon={Thermometer}
          color="red"
        />
        <SensorCard
          title={t('dashboard.airHumidity')}
          value={latestData?.humiditeAir?.toFixed(1) || 0}
          unit="%"
          icon={Wind}
          color="green"
        />
        <SensorCard
          title={t('dashboard.luminosity')}
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
            title={t('dashboard.evolution')}
            dataKeys={[
              { key: 'humiditeSol', name: 'Humidité Sol' },
              { key: 'temperatureAir', name: 'Température' },
              { key: 'humiditeAir', name: 'Humidité Air' }
            ]}
          />
        </div>
        <div className="space-y-6">
          <AlertPanel alerts={alerts} onMarkAsRead={markAsRead} />
          <IrrigationHistory />
        </div>
      </div>

      {/* Statistiques */}
      {stats && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.statistics')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('dashboard.avgSoilHumidity')}</p>
              <p className="text-2xl font-bold text-primary-600">
                {stats.avgHumiditeSol?.toFixed(0) || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('dashboard.avgTemperature')}</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.avgTemperature?.toFixed(1) || 0}°C
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('dashboard.avgAirHumidity')}</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.avgHumiditeAir?.toFixed(1) || 0}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{t('dashboard.avgLuminosity')}</p>
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