import React, { useState, useEffect } from 'react';
import { Activity, Users, Camera, AlertTriangle } from 'lucide-react';
import api from '../../config/api';
import Card from '../common/Card';

const SystemStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSensors: 0,
    totalImages: 0,
    totalAlerts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Récupérer les statistiques depuis différentes APIs
      const [users, sensors, alerts] = await Promise.all([
        api.get('/user'),
        api.get('/capteur'),
        api.get('/alert')
      ]);

      setStats({
        totalUsers: users.data.count,
        totalSensors: sensors.data.count,
        totalImages: 0, // À implémenter
        totalAlerts: alerts.data.count
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50'
    },
    {
      title: 'Capteurs',
      value: stats.totalSensors,
      icon: Activity,
      color: 'bg-green-500',
      bgLight: 'bg-green-50'
    },
    {
      title: 'Images analysées',
      value: stats.totalImages,
      icon: Camera,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50'
    },
    {
      title: 'Alertes actives',
      value: stats.totalAlerts,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgLight: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  stat.value
                )}
              </p>
            </div>
            <div className={`${stat.bgLight} p-3 rounded-lg`}>
              <stat.icon className={`h-8 w-8 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SystemStats;
