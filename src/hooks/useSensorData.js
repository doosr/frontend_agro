import { useState, useEffect } from 'react';
import sensorService from '../services/sensorService';
import socketService from '../services/socketService';
import { useAuth } from '../context/AuthContext';

export const useSensorData = () => {
  const { user } = useAuth();
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestData();

    // Connexion Socket.IO pour les mises à jour en temps réel
    if (user) {
      const socket = socketService.connect(user.id);
      
      socket.on('newSensorData', (data) => {
        setLatestData(data);
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [user]);

  const fetchLatestData = async () => {
    try {
      setLoading(true);
      const response = await sensorService.getLatestData();
      setLatestData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { latestData, loading, error, refetch: fetchLatestData };
};