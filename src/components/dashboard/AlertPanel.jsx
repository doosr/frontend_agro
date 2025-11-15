import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AlertPanel = ({ alerts, onMarkAsRead }) => {
  const getAlertIcon = (severite) => {
    switch (severite) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getAlertColor = (severite) => {
    switch (severite) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes Récentes</h3>
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">Aucune alerte pour le moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes Récentes</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.slice(0, 5).map((alert) => (
          <div
            key={alert._id}
            className={`p-4 rounded-lg border-2 ${getAlertColor(alert.severite)} ${
              !alert.lu ? 'shadow-md' : 'opacity-75'
            }`}
          >
            <div className="flex items-start space-x-3">
              {getAlertIcon(alert.severite)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{alert.titre}</h4>
                  {!alert.lu && (
                    <button
                      onClick={() => onMarkAsRead(alert._id)}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Marquer comme lu
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {format (new Date(alert.timestamp), 'dd MMM yyyy à HH:mm', { locale: fr })}
</p>
</div>
</div>
</div>
))}
</div>
</div>
);
};
export default AlertPanel;