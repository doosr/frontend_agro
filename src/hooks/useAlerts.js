import { useState, useEffect } from 'react';
import api from '../config/api';
import socketService from '../services/socketService';
import { toast } from 'react-toastify';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();

    // Écouter les nouvelles alertes
    socketService.on('newAlert', (alert) => {
      setAlerts(prev => [alert, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Notification toast
      toast.warning(alert.titre, {
        position: 'top-right',
        autoClose: 5000,
      });
    });
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/alert');
      setAlerts(response.data.data);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Erreur chargement alertes:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId) => {
    try {
      await api.put(`/alert/${alertId}/read`);
      setAlerts(prev => 
        prev.map(alert => 
          alert._id === alertId ? { ...alert, lu: true } : alert
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Erreur marquage alerte:', error);
    }
  };

  const deleteAlert = async (alertId) => {
    try {
      await api.delete(`/alert/${alertId}`);
      setAlerts(prev => prev.filter(alert => alert._id !== alertId));
    } catch (error) {
      console.error('Erreur suppression alerte:', error);
    }
  };

  return { alerts, unreadCount, loading, markAsRead, deleteAlert, refetch: fetchAlerts };
};