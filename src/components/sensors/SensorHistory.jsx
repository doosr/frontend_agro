import React from 'react';
import { Download } from 'lucide-react';
import Button from '../common/Button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const SensorHistory = ({ data }) => {
  const handleExport = () => {
    // Convertir en CSV
    const headers = ['Date', 'Humidité Sol', 'Température', 'Humidité Air', 'Luminosité', 'Pompe'];
    const rows = data.map(item => [
      format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm:ss', { locale: fr }),
      item.humiditeSol,
      item.temperatureAir?.toFixed(2),
      item.humiditeAir?.toFixed(2),
      item.luminosite,
      item.etatPompe ? 'ON' : 'OFF'
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historique_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;
    a.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Historique des Données</h3>
        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={handleExport}
        >
          Exporter CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Date & Heure</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Hum. Sol</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Temp.</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Hum. Air</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Luminosité</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Pompe</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">
                  {format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm', { locale: fr })}
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">{item.humiditeSol}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {item.temperatureAir?.toFixed(1)}°C
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {item.humiditeAir?.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">{item.luminosite}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.etatPompe ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.etatPompe ? 'ON' : 'OFF'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorHistory;