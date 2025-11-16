import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const { token } = useAuth();

  // Récupérer les alertes initiales
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/alert', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAlerts(response.data.data);
      setUnreadCount(response.data.unreadCount);
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

    // Connexion SSE
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/alert/stream`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    eventSource.onopen = () => {
      console.log('✅ Connecté au flux d\'alertes');
      setConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const newAlert = JSON.parse(event.data);
        
        // Ignorer les messages heartbeat et connected
        if (newAlert.type === 'connected') return;
        
        console.log('🔔 Nouvelle alerte reçue:', newAlert);
        
        // Ajouter la nouvelle alerte en tête de liste
        setAlerts(prev => [newAlert, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Notification du navigateur (si permission accordée)
        if (Notification.permission === 'granted') {
          new Notification(newAlert.titre, {
            body: newAlert.message,
            icon: '/logo192.png',
            tag: newAlert._id
          });
        }
        
        // Jouer un son (optionnel)
        const audio = new Audio('/notification.mp3');
        audio.play().catch(e => console.log('Son désactivé'));
        
      } catch (error) {
        console.error('Erreur parsing alerte:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('❌ Erreur SSE:', error);
      setConnected(false);
      eventSource.close();
    };

    // Cleanup
    return () => {
      eventSource.close();
      setConnected(false);
    };
  }, [token]);

  // Marquer comme lu
  const markAsRead = async (id) => {
    try {
      await axios.put(
        `/api/alert/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setAlerts(prev => 
        prev.map(alert => 
          alert._id === id ? { ...alert, lu: true } : alert
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Erreur marquer lu:', error);
      throw error;
    }
  };

  // Supprimer une alerte
  const deleteAlert = async (id) => {
    try {
      await axios.delete(`/api/alert/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const deletedAlert = alerts.find(a => a._id === id);
      
      setAlerts(prev => prev.filter(alert => alert._id !== id));
      
      if (deletedAlert && !deletedAlert.lu) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Erreur suppression:', error);
      throw error;
    }
  };

  // Marquer toutes comme lues
  const markAllAsRead = async () => {
    try {
      await axios.put(
        '/api/alert/read-all',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setAlerts(prev => prev.map(alert => ({ ...alert, lu: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Erreur marquer toutes lues:', error);
      throw error;
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