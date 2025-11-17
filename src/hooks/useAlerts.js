import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const token = localStorage.getItem('token');

  const fetchAlerts = async () => {
    if (!token) return;
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/api/alert`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAlerts(response.data.data || []);
      setUnreadCount(response.data.unreadCount || 0);

    } catch (error) {
      console.error("Erreur chargement alertes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchAlerts();

    const eventSource = new EventSource(
      `${API_URL}/api/alert/stream?token=${token}`
    );

    eventSource.onopen = () => {
      console.log("✅ Connecté au flux SSE");
      setConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const newAlert = JSON.parse(event.data);
        if (newAlert.type === "connected") return;

        setAlerts(prev => [newAlert, ...prev]);
        setUnreadCount(prev => prev + 1);

        if (Notification.permission === "granted") {
          new Notification(newAlert.titre, {
            body: newAlert.message,
            icon: "/logo192.png"
          });
        }

        const audio = new Audio('/notification.mp3');
        audio.play().catch(() => {});
      } catch (err) {
        console.error("Erreur parsing alerte:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("❌ SSE Error:", err);
      setConnected(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      setConnected(false);
    };
  }, [token]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/api/alert/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAlerts(prev =>
        prev.map(alert => alert._id === id ? { ...alert, lu: true } : alert)
      );

      setUnreadCount(prev => Math.max(prev - 1, 0));

    } catch (err) {
      console.error("Erreur markAsRead:", err);
    }
  };

  const deleteAlert = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/alert/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const deleted = alerts.find(a => a._id === id);

      setAlerts(prev => prev.filter(a => a._id !== id));

      if (deleted && !deleted.lu) {
        setUnreadCount(prev => Math.max(prev - 1, 0));
      }

    } catch (err) {
      console.error("Erreur suppression alerte:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`${API_URL}/api/alert/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAlerts(prev => prev.map(a => ({ ...a, lu: true })));
      setUnreadCount(0);

    } catch (err) {
      console.error("Erreur markAllAsRead:", err);
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
    fetchAlerts
  };
};
