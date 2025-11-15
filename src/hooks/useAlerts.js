import { useState, useEffect } from "react";
import alertService from "../services/alertService";

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await alertService.getAlerts();
      
      // 🔍 DEBUG: Log the response
      console.log("Full API response:", res);
      console.log("res.data:", res.data);
      console.log("Is res.data an array?", Array.isArray(res.data));
      
      setAlerts(res.data.data || []);
    } catch (err) {
      console.error("Erreur récupération alertes:", err);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId) => {
    try {
      await alertService.markAsRead(alertId);
      setAlerts((prev) => prev.map(a => 
        a._id === alertId ? { ...a, lu: true } : a
      ));
    } catch (err) {
      console.error("Erreur lecture alerte:", err);
      throw err;
    }
  };

  const deleteAlert = async (alertId) => {
    try {
      await alertService.deleteAlert(alertId);
      setAlerts((prev) => prev.filter((a) => a._id !== alertId));
    } catch (err) {
      console.error("Erreur suppression alerte:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // 🔍 DEBUG: Log what's being returned
  console.log("useAlerts returning - alerts:", alerts, "type:", typeof alerts, "isArray:", Array.isArray(alerts));

  return { alerts, loading, markAsRead, deleteAlert };
}