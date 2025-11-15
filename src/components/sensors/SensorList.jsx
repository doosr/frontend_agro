import React from 'react';
import { Activity, MapPin, Clock } from 'lucide-react';
import Badge from '../common/Badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const SensorList = ({ capteurs, onSelectCapteur }) => {
  return (
    <div className="space-y-4">
      {capteurs.map((capteur) => (
        <div
          key={capteur._id}
          onClick={() => onSelectCapteur?.(capteur)}
          className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-primary-500 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <div className={`p-3 rounded-lg ${
                capteur.actif ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Activity className={`h-6 w-6 ${
                  capteur.actif ? 'text-green-600' : 'text-gray-400'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {capteur.nom}
                  </h3>
                  <Badge variant={capteur.actif ? 'success' : 'default'}>
                    {capteur.actif ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600">
                  {capteur.localisation && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{capteur.localisation}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {capteur.derniereDonnee
                        ? `Dernière donnée: ${format(new Date(capteur.derniereDonnee), 'dd/MM/yyyy à HH:mm', { locale: fr })}`
                        : 'Aucune donnée reçue'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-gray-500">Type</p>
              <p className="text-sm font-medium text-gray-900">{capteur.type}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SensorList;