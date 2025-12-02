import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import Card from '../common/Card';

const DiagnosticResult = ({ result }) => {
  const getRecommendationImage = (text) => {
    const lower = text.toLowerCase();

    // Arrosage et humidité
    if (lower.includes('arros') || lower.includes('eau') || lower.includes('humid') ||
      lower.includes('mouill') || lower.includes('drainage'))
      return '/images/recommendations/watering.png';

    // Taille, retrait, nettoyage des feuilles
    if (lower.includes('tail') || lower.includes('coup') || lower.includes('retir') ||
      lower.includes('supprim') || lower.includes('enlev') || lower.includes('nettoyer les feuilles'))
      return '/images/recommendations/pruning.png';

    // Traitement, fongicides, insecticides
    if (lower.includes('insect') || lower.includes('acarien') || lower.includes('trait') ||
      lower.includes('fongicid') || lower.includes('pulv') || lower.includes('appliqu'))
      return '/images/recommendations/fungicide.png';

    // Isolation, protection, destruction
    if (lower.includes('isol') || lower.includes('prot') || lower.includes('détruir') ||
      lower.includes('filet') || lower.includes('contrôl') || lower.includes('désinf'))
      return '/images/recommendations/protection.png';

    // Ventilation, espacement, circulation d'air
    if (lower.includes('temp') || lower.includes('ventil') || lower.includes('air') ||
      lower.includes('espac') || lower.includes('circulation') || lower.includes('aér'))
      return '/images/recommendations/ventilation.png';

    // Surveillance, soins généraux
    if (lower.includes('surveill') || lower.includes('sain') || lower.includes('continuer'))
      return '/images/recommendations/general.png';

    // Retourner null si aucune correspondance (affichage texte uniquement)
    return null;
  };

  // Support both nested (history) and flat (fresh) data structures
  const data = result.resultatAnalyse || result;
  const maladie = data.maladie || data.predictionFr || data.prediction;
  const confiance = data.confiance || data.confidence;
  const recommandations = data.recommandations || data.recommendations;

  const isSain = maladie === 'Sain' || maladie === 'Tomato_healthy';
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

        {/* Recommandations Visuelles */}
        {recommandations && recommandations.length > 0 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Lightbulb className="h-6 w-6 text-blue-600" />
              <h4 className="text-lg font-semibold text-blue-900">Recommandations</h4>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {recommandations.map((rec, index) => {
                const imageUrl = getRecommendationImage(rec);
                return (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                    {imageUrl ? (
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={imageUrl}
                            alt="Recommandation"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </div>
                        <p className="text-gray-700 text-sm font-medium flex-1 self-center">{rec}</p>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-600 text-lg mt-0.5">•</span>
                        <p className="text-gray-700 text-sm font-medium flex-1">{rec}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DiagnosticResult;
