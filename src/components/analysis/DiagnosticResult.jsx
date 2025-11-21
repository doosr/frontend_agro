import React from 'react';
import { 
  CheckCircle, AlertTriangle, Lightbulb, Droplets, AlertCircle, TrendingUp,
  Scissors, Spray, Trash2, Wind, Shield, Eye, Leaf, Thermometer,
  Sun, Cloud, Bug, FlaskConical, Recycle, Crown, PackagePlus
} from 'lucide-react';

const DiagnosticResult = ({ result }) => {
  if (!result || !result.resultatAnalyse) {
    return null;
  }

  const { 
    maladie, 
    maladieFr,
    confiance, 
    recommandations,
    maladieDetectee,
    severite,
    arrosageNecessaire
  } = result.resultatAnalyse;

  const isSain = maladie?.includes('healthy') || maladie === 'Sain';
  const confidence = (confiance * 100).toFixed(1);

  // Mapping des mots-clés vers des icônes
  const getIconForAction = (action) => {
    const actionLower = action.toLowerCase();
    
    if (actionLower.includes('tailler') || actionLower.includes('couper') || actionLower.includes('enlever')) {
      return { Icon: Scissors, color: 'text-purple-600', bg: 'bg-purple-100' };
    }
    if (actionLower.includes('fongicide') || actionLower.includes('traiter') || actionLower.includes('appliquer')) {
      return { Icon: Spray, color: 'text-blue-600', bg: 'bg-blue-100' };
    }
    if (actionLower.includes('détruire') || actionLower.includes('retirer') || actionLower.includes('supprimer')) {
      return { Icon: Trash2, color: 'text-red-600', bg: 'bg-red-100' };
    }
    if (actionLower.includes('circulation') || actionLower.includes('aération') || actionLower.includes('ventilation')) {
      return { Icon: Wind, color: 'text-cyan-600', bg: 'bg-cyan-100' };
    }
    if (actionLower.includes('protéger') || actionLower.includes('isoler')) {
      return { Icon: Shield, color: 'text-green-600', bg: 'bg-green-100' };
    }
    if (actionLower.includes('surveiller') || actionLower.includes('observer')) {
      return { Icon: Eye, color: 'text-indigo-600', bg: 'bg-indigo-100' };
    }
    if (actionLower.includes('arroser') || actionLower.includes('irrigation') || actionLower.includes('humidité')) {
      return { Icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100' };
    }
    if (actionLower.includes('fertiliser') || actionLower.includes('engrais') || actionLower.includes('nutrition')) {
      return { Icon: FlaskConical, color: 'text-amber-600', bg: 'bg-amber-100' };
    }
    if (actionLower.includes('rotation') || actionLower.includes('cultiver')) {
      return { Icon: Recycle, color: 'text-teal-600', bg: 'bg-teal-100' };
    }
    if (actionLower.includes('variété') || actionLower.includes('résistant')) {
      return { Icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-100' };
    }
    if (actionLower.includes('pailler') || actionLower.includes('paille')) {
      return { Icon: PackagePlus, color: 'text-orange-600', bg: 'bg-orange-100' };
    }
    if (actionLower.includes('température') || actionLower.includes('chaleur')) {
      return { Icon: Thermometer, color: 'text-red-500', bg: 'bg-red-100' };
    }
    if (actionLower.includes('soleil') || actionLower.includes('lumière')) {
      return { Icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-100' };
    }
    if (actionLower.includes('ombre') || actionLower.includes('abri')) {
      return { Icon: Cloud, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
    if (actionLower.includes('insecte') || actionLower.includes('ravageur') || actionLower.includes('puceron')) {
      return { Icon: Bug, color: 'text-rose-600', bg: 'bg-rose-100' };
    }
    
    // Par défaut
    return { Icon: Leaf, color: 'text-green-600', bg: 'bg-green-100' };
  };

  const prioriteColors = {
    haute: 'border-red-400 bg-red-50',
    moyenne: 'border-yellow-400 bg-yellow-50',
    faible: 'border-blue-400 bg-blue-50'
  };

  const severiteConfig = {
    high: { label: 'Élevée', color: 'text-red-600', bg: 'bg-red-100' },
    medium: { label: 'Moyenne', color: 'text-orange-600', bg: 'bg-orange-100' },
    low: { label: 'Faible', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    none: { label: 'Aucune', color: 'text-green-600', bg: 'bg-green-100' }
  };

  const currentSeverite = severiteConfig[severite] || severiteConfig.none;

  return (
    <div className="space-y-6">
      {/* Card principale du diagnostic */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200">
        <div className={`p-6 ${isSain ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              {isSain ? (
                <CheckCircle className="h-10 w-10" />
              ) : (
                <AlertTriangle className="h-10 w-10" />
              )}
              <div>
                <h3 className="text-2xl font-bold">
                  {isSain ? 'Plante Saine' : 'Maladie Détectée'}
                </h3>
                <p className="text-green-100 text-sm mt-1">
                  Analyse effectuée avec {confidence}% de confiance
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{confidence}%</div>
              <div className="text-sm text-green-100">Confiance</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="text-sm text-gray-600 font-medium mb-1">Diagnostic</div>
            <div className="text-2xl font-bold text-gray-900">
              {maladieFr || maladie}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Niveau de confiance</span>
              <span className="font-bold text-gray-900">{confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-700 ${
                  isSain ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className={`rounded-lg p-4 border-2 ${maladieDetectee ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <AlertCircle className={`h-5 w-5 ${maladieDetectee ? 'text-red-600' : 'text-green-600'}`} />
                <span className="text-xs font-medium text-gray-600">État</span>
              </div>
              <div className={`text-lg font-bold ${maladieDetectee ? 'text-red-700' : 'text-green-700'}`}>
                {maladieDetectee ? 'Malade' : 'Sain'}
              </div>
            </div>

            <div className={`rounded-lg p-4 border-2 ${currentSeverite.bg} border-opacity-50`}>
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className={`h-5 w-5 ${currentSeverite.color}`} />
                <span className="text-xs font-medium text-gray-600">Sévérité</span>
              </div>
              <div className={`text-lg font-bold ${currentSeverite.color}`}>
                {currentSeverite.label}
              </div>
            </div>

            <div className={`rounded-lg p-4 border-2 ${arrosageNecessaire ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <Droplets className={`h-5 w-5 ${arrosageNecessaire ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="text-xs font-medium text-gray-600">Arrosage</span>
              </div>
              <div className={`text-lg font-bold ${arrosageNecessaire ? 'text-blue-700' : 'text-gray-700'}`}>
                {arrosageNecessaire ? 'Requis' : 'Non requis'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommandations avec ICÔNES VISUELLES */}
      {recommandations && recommandations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-200">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div className="flex items-center space-x-3 text-white">
              <Lightbulb className="h-8 w-8" />
              <div>
                <h3 className="text-2xl font-bold">Plan d'Action Visuel</h3>
                <p className="text-blue-100 text-sm mt-1">
                  {recommandations.length} action{recommandations.length > 1 ? 's' : ''} illustrée{recommandations.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommandations.map((rec, index) => {
                const isObject = typeof rec === 'object' && rec !== null;
                const action = isObject ? rec.action : rec;
                const efficacite = isObject ? rec.efficacite : null;
                const priorite = isObject ? rec.priorite : 'moyenne';

                const { Icon, color, bg } = getIconForAction(action);

                return (
                  <div
                    key={index}
                    className={`rounded-xl border-2 p-5 transition-all hover:shadow-lg hover:scale-105 ${
                      prioriteColors[priorite] || prioriteColors.moyenne
                    }`}
                  >
                    {/* Icône en grand avec cercle coloré */}
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${bg} flex items-center justify-center shadow-md`}>
                        <Icon className={`h-9 w-9 ${color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Badge priorité + numéro */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold text-gray-700">
                            #{index + 1}
                          </span>
                          <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full ${
                            priorite === 'haute' ? 'bg-red-200 text-red-800' :
                            priorite === 'moyenne' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-blue-200 text-blue-800'
                          }`}>
                            {priorite}
                          </span>
                        </div>
                        
                        {/* Texte de l'action */}
                        <p className="text-gray-900 font-medium text-sm leading-relaxed mb-3">
                          {action}
                        </p>

                        {/* Barre d'efficacité */}
                        {efficacite !== null && (
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-600 font-medium">Efficacité</span>
                              <span className="font-bold text-gray-900">{efficacite}%</span>
                            </div>
                            <div className="w-full bg-white bg-opacity-60 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-2 rounded-full transition-all duration-700 ${
                                  efficacite >= 85 ? 'bg-green-600' :
                                  efficacite >= 70 ? 'bg-yellow-600' :
                                  'bg-orange-600'
                                }`}
                                style={{ width: `${efficacite}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {result.timestamp && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>
                <strong>Analysé le:</strong> {new Date(result.timestamp).toLocaleString('fr-FR')}
              </span>
              {result.modelUsed && (
                <span className="text-gray-500">
                  Modèle: {result.modelUsed}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticResult;