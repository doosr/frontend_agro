import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import Card from '../common/Card';

const DiagnosticResult = ({ result }) => {
  if (!result || !result.resultatAnalyse) {
    return null;
  }

  const { maladie, confiance, recommandations } = result.resultatAnalyse;
  const isSain = maladie === 'Sain';
  const confidence = (confiance * 100).toFixed(1);

  return (
    <Card 
      title="Résultat de l'Analyse" 
      icon={isSain ? CheckCircle : AlertTriangle}
    >
      <div className="space-y-6">
        {/* Image analysée */}
        <div className="relative">
          <img
            src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}/${result.path}`}
            alt="Plante analysée"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Diagnostic */}
        <div className={`p-4 rounded-lg ${isSain ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-gray-900">Diagnostic</h4>
            {isSain ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-600" />
            )}
          </div>
          <p className={`text-2xl font-bold ${isSain ? 'text-green-700' : 'text-red-700'}`}>
            {maladie}
          </p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Confiance</span>
              <span className="font-semibold">{confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${isSain ? 'bg-green-600' : 'bg-red-600'}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recommandations */}
        {recommandations && recommandations.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Recommandations</h4>
            </div>
            <ul className="space-y-2">
              {recommandations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-blue-800">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DiagnosticResult;
