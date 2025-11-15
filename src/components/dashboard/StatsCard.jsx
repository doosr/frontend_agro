import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend,
  trendValue,
  color = 'blue' 
}) => {
  const colors = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      icon: 'bg-blue-100',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      icon: 'bg-green-100',
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      icon: 'bg-yellow-100',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: 'bg-red-100',
    },
  };

  const colorScheme = colors[color];

  return (
    <div className={`${colorScheme.bg} rounded-xl p-6 border border-gray-200`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorScheme.icon}`}>
          <Icon className={`h-6 w-6 ${colorScheme.text}`} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend > 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span className="font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <div className="flex items-baseline space-x-2">
        <p className={`text-3xl font-bold ${colorScheme.text}`}>
          {value}
        </p>
        {unit && <span className="text-lg text-gray-600">{unit}</span>}
      </div>
      
      {trendValue && (
        <p className="text-xs text-gray-500 mt-2">{trendValue}</p>
      )}
    </div>
  );
};

export default StatsCard;