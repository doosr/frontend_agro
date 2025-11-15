import React from 'react';

const Card = ({ title, subtitle, icon: Icon, children, className = '', headerAction }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {(title || subtitle || Icon) && (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-primary-100 rounded-lg">
                <Icon className="h-6 w-6 text-primary-600" />
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;