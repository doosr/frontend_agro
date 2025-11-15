import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../components/common/Card';
import ChartWidget from '../components/dashboard/ChartWidget';
import Loader from '../components/common/Loader';
import sensorService from '../services/sensorService';

const Sensors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('24h');

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await sensorService.getSensorData({ limit: 100 });
      setData(response.data.reverse());
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" text="Chargement des données..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Données des Capteurs</h1>
          <p className="text-gray-600 mt-2">Historique et analyse des mesures</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="24h">24 heures</option>
          <option value="7d">7 jours</option>
          <option value="30d">30 jours</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          data={data}
          title="Humidité du Sol"
          dataKeys={[{ key: 'humiditeSol', name: 'Humidité Sol' }]}
        />
        <ChartWidget
          data={data}
          title="Température et Humidité de l'Air"
          dataKeys={[
            { key: 'temperatureAir', name: 'Température' },
            { key: 'humiditeAir', name: 'Humidité Air' }
          ]}
        />
        <ChartWidget
          data={data}
          title="Luminosité"
          dataKeys={[{ key: 'luminosite', name: 'Luminosité' }]}
        />
        <Card title="Tableau des Données" icon={Activity}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Hum. Sol</th>
                  <th className="px-4 py-2 text-left">Temp.</th>
                  <th className="px-4 py-2 text-left">Lum.</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{new Date(item.timestamp).toLocaleString('fr-FR')}</td>
                    <td className="px-4 py-2">{item.humiditeSol}</td>
                    <td className="px-4 py-2">{item.temperatureAir?.toFixed(1)}°C</td>
                    <td className="px-4 py-2">{item.luminosite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Sensors;