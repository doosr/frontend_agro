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
  const severity = data.severity || 'none';

  const isSain = maladie === 'Sain' || maladie === 'Tomato_healthy';
  const confidence = (confiance * 100).toFixed(1);

  // Fonction pour obtenir les couleurs basées sur la sévérité
  const getSeverityColors = () => {
    if (isSain || severity === 'none') {
      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-800'
      };
    }

    switch (severity) {
      case 'low':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'medium':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-700',
          icon: 'text-orange-600',
          badge: 'bg-orange-100 text-orange-800'
        };
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-800'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          icon: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  // Fonction pour obtenir la couleur de la barre de confiance
  const getConfidenceColor = () => {
    const conf = parseFloat(confidence);
    if (conf >= 90) return isSain ? 'bg-green-600' : 'bg-red-600';
    if (conf >= 70) return isSain ? 'bg-green-500' : 'bg-orange-500';
    if (conf >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  // Traduction de la sévérité
  const getSeverityLabel = () => {
    const labels = {
      'none': 'Aucune',
      'low': 'Faible',
      'medium': 'Moyenne',
      'high': 'Élevée'
    };
    return labels[severity] || severity;
  };

  const colors = getSeverityColors();

  return (
    <Card
      title="Résultat de l'Analyse"
      icon={isSain ? CheckCircle : AlertTriangle}
    >
      <div className="space-y-6">
        {/* Diagnostic */}
        <div className={`p-6 rounded-lg ${colors.bg} border-2 ${colors.border}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-gray-900">Diagnostic</h4>
            <div className="flex items-center space-x-2">
              {/* Badge de sévérité */}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                Sévérité: {getSeverityLabel()}
              </span>
              {isSain ? (
                <CheckCircle className={`h-7 w-7 ${colors.icon}`} />
              ) : (
                <AlertTriangle className={`h-7 w-7 ${colors.icon}`} />
              )}
            </div>
          </div>
          <p className={`text-3xl font-bold mb-4 ${colors.text}`}>
            {maladie}
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-700 font-medium">Confiance du modèle</span>
              <span className={`font-bold text-lg ${colors.text}`}>{confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${getConfidenceColor()}`}
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
