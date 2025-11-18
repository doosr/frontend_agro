// src/pages/Alerts.jsx
import React, { useState } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useAlerts } from '../hooks/useAlerts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Alerts = () => {
  const { alerts, loading, markAsRead, deleteAlert } = useAlerts();
  const [processing, setProcessing] = useState(null);

  const handleMark = async (id) => {
    try {
      setProcessing(id);
      await markAsRead(id);
    } catch (err) {
      console.error('Erreur marquer lu', err);
      // Optionnel: toast
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setProcessing(id);
      await deleteAlert(id);
    } catch (err) {
      console.error('Erreur suppression', err);
      // Optionnel: toast
    } finally {
      setProcessing(null);
    }
  };

  const getSeverityColor = (severite) => {
    switch (severite) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'warning':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default:
        return 'bg-blue-100 border-blue-300 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" text="Chargement des alertes..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Centre de Notifications</h1>
        <p className="text-gray-600 mt-2">Gérez vos alertes et notifications</p>
      </div>

      {(!alerts || alerts.length === 0) ? (
        <Card>
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune alerte</h3>
            <p className="text-gray-600">Vous n'avez pas de notifications pour le moment</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts?.map((alert) => (
            <div
              key={alert._id}
              className={`border-2 rounded-lg p-6 ${getSeverityColor(alert.severite)} ${
                !alert.lu ? 'shadow-lg' : 'opacity-75'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{alert.titre}</h3>
                    {!alert.lu && (
                      <span className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs font-medium">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-3">{alert.message}</p>
                  <p className="text-xs opacity-75">
                    {format(new Date(alert.timestamp), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  {!alert.lu && (
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={Check}
                      onClick={() => handleMark(alert._id)}
                      disabled={processing === alert._id}
                    >
                      {processing === alert._id ? '...' : 'Marquer lu'}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="danger"
                    icon={Trash2}
                    onClick={() => handleDelete(alert._id)}
                    disabled={processing === alert._id}
                  >
                    {processing === alert._id ? '...' : 'Supprimer'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default Alerts;