import { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/authService';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  // Récupérer le token depuis authService/localStorage
  const token = localStorage.getItem('token');

  // Récupérer les alertes initiales
  const fetchAlerts = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.get('/api/alert', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts(response.data.data || []);
      setUnreadCount(response.data.unreadCount || 0);
    } catch (error) {
      console.error('Erreur chargement alertes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Connexion SSE pour les alertes en temps réel
  useEffect(() => {
    if (!token) return;

    fetchAlerts();

    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/alert/stream`
    );

    eventSource.onopen = () => {
      console.log('✅ Connecté au flux d\'alertes');
      setConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const newAlert = JSON.parse(event.data);

        // Ignorer les messages heartbeat ou connect
        if (newAlert.type === 'connected') return;

        console.log('🔔 Nouvelle alerte reçue:', newAlert);

        setAlerts(prev => [newAlert, ...prev]);
        setUnreadCount(prev => prev + 1);

        // Notification du navigateur
        if (Notification.permission === 'granted') {
          new Notification(newAlert.titre, {
            body: newAlert.message,
            icon: '/logo192.png',
            tag: newAlert._id
          });
        }

        // Son notification (optionnel)
        const audio = new Audio('/notification.mp3');
        audio.play().catch(() => {});
      } catch (err) {
        console.error('Erreur parsing alerte:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('❌ SSE Error:', err);
      setConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      setConnected(false);
    };
  }, [token]);

  // Marquer une alerte comme lue
  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/alert/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts(prev =>
        prev.map(alert => alert._id === id ? { ...alert, lu: true } : alert)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Erreur marquer lu:', err);
      throw err;
    }
  };

  // Supprimer une alerte
  const deleteAlert = async (id) => {
    try {
      await axios.delete(`/api/alert/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const deleted = alerts.find(a => a._id === id);
      setAlerts(prev => prev.filter(a => a._id !== id));
      if (deleted && !deleted.lu) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Erreur suppression alerte:', err);
      throw err;
    }
  };

  // Marquer toutes les alertes comme lues
  const markAllAsRead = async () => {
    try {
      await axios.put('/api/alert/read-all', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts(prev => prev.map(alert => ({ ...alert, lu: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Erreur marquer toutes lues:', err);
      throw err;
    }
  };

  // Demander permission notifications
  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  return {
    alerts,
    unreadCount,
    loading,
    connected,
    markAsRead,
    deleteAlert,
    markAllAsRead,
    fetchAlerts,
    requestNotificationPermission
  };
};
