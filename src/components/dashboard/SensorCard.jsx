import React from 'react';

const SensorCard = ({ title, value, unit, icon: Icon, color, trend }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline space-x-2 mt-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <span className="text-lg text-gray-500">{unit}</span>
          </div>
          {trend && (
            <p className={`text-sm mt-2 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.value}% {trend.positive ? '↑' : '↓'}
            </p>
          )}
        </div>
        <div className={`p-4 rounded-full ${colors[color]}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default SensorCard; // ✅ export default