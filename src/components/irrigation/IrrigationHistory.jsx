import React from 'react';
import { Droplets, User, Bot } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Badge from '../common/Badge';

const IrrigationHistory = ({ history }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique d'Irrigation</h3>
      
      {history.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Droplets className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <p>Aucun historique disponible</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  item.action === 'ON' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Droplets className={`h-5 w-5 ${
                    item.action === 'ON' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                
                <div>
                  <p className="font-medium text-gray-900">
                    Arrosage {item.action === 'ON' ? 'activé' : 'désactivé'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(item.timestamp), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                  </p>
                  {item.duration && (
                    <p className="text-xs text-gray-500 mt-1">
                      Durée: {Math.floor(item.duration / 60)}min {item.duration % 60}s
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant={item.type === 'manual' ? 'warning' : 'info'}>
                  {item.type === 'manual' ? (
                    <><User className="h-3 w-3 mr-1 inline" /> Manuel</>
                  ) : (
                    <><Bot className="h-3 w-3 mr-1 inline" /> Auto</>
                  )}
                </Badge>
                {item.reason && (
                  <span className="text-xs text-gray-500">({item.reason})</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IrrigationHistory;