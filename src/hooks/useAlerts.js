// src/hooks/useAlerts.js
import { useState, useEffect, useCallback, useRef } from 'react';
import alertService from '../services/alertService';

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchingRef = useRef(false);
  const mountedRef = useRef(true);

  const fetchAlerts = useCallback(async (options = {}) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const res = await alertService.getAlerts(options);
      if (!mountedRef.current) return;
      setAlerts(res.data || []);
    } catch (err) {
      console.error('fetchAlerts error', err);
      if (!mountedRef.current) return;
      setError(err);
    } finally {
      fetchingRef.current = false;
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    fetchAlerts();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchAlerts]);

  const markAsRead = useCallback(async (alertId) => {
    try {
      await alertService.markAsRead(alertId);
      // mettre à jour localement sans re-fetch complet
      setAlerts((prev) => prev.map(a => a._id === alertId ? { ...a, lu: true } : a));
    } catch (err) {
      console.error('markAsRead error', err);
      throw err;
    }
  }, []);

  const deleteAlert = useCallback(async (alertId) => {
    try {
      await alertService.deleteAlert(alertId);
      setAlerts((prev) => prev.filter(a => a._id !== alertId));
    } catch (err) {
      console.error('deleteAlert error', err);
      throw err;
    }
  }, []);

  const refresh = useCallback(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    loading,
    error,
    markAsRead,
    deleteAlert,
    refresh
  };
}
