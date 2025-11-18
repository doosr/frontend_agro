import React, { useState, useRef } from 'react';
import { Upload, Camera, X, CheckCircle, AlertTriangle, Lightbulb, Image } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const ImageUploadIA = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  // Configuration de l'URL du serveur IA
  const IA_SERVER_URL = process.env.REACT_APP_IA_SERVER_URL || 'http://localhost:5001';

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }
      
      // Vérifier la taille (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image trop grande (max 10MB)');
        return;
      }

      setSelectedImage(file);
      setResult(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Veuillez sélectionner une image');
      return;
    }

    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('capteurId', 'web-upload');
      formData.append('userId', localStorage.getItem('userId') || 'anonymous');

      const response = await fetch(`${IA_SERVER_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
        alert('✅ Analyse terminée avec succès !');
      } else {
        throw new Error(data.error || 'Erreur lors de l\'analyse');
      }

    } catch (error) {
      console.error('Erreur analyse:', error);
      alert(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isSain = result?.prediction === 'Tomato_healthy';
  const confidence = result?.confidence ? (result.confidence * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Card Upload */}
      <Card title="Analyser une Image" icon={Camera}>
        <div className="space-y-4">
          {/* Zone de dépôt */}
          {!preview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Cliquez pour sélectionner une image
              </p>
              <p className="text-sm text-gray-500">
                ou glissez-déposez une image ici
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG ou JPEG (max. 10MB)
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-96 object-contain rounded-lg bg-gray-100"
              />
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Bouton d'upload */}
          {preview && !result && (
            <Button
              variant="primary"
              size="lg"
              icon={Upload}
              onClick={handleUpload}
              loading={loading}
              className="w-full"
            >
              Analyser avec l'IA
            </Button>
          )}
        </div>
      </Card>

      {/* Résultats de l'analyse */}
      {result && (
        <Card title="Résultat de l'Analyse" icon={isSain ? CheckCircle : AlertTriangle}>
          <div className="space-y-6">
            {/* Diagnostic */}
            <div className={`p-6 rounded-lg ${isSain ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-gray-900">Diagnostic</h4>
                {isSain ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                )}
              </div>
              
              <p className={`text-3xl font-bold mb-4 ${isSain ? 'text-green-700' : 'text-red-700'}`}>
                {result.predictionFr || result.prediction}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Confiance du modèle</span>
                  <span className="font-bold text-gray-900">{confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${isSain ? 'bg-green-600' : 'bg-red-600'}`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Maladie détectée:</span>
                  <span className="ml-2 font-semibold">{result.diseaseDetected ? 'Oui' : 'Non'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Sévérité:</span>
                  <span className="ml-2 font-semibold capitalize">{result.severity}</span>
                </div>
                <div>
                  <span className="text-gray-600">Arrosage nécessaire:</span>
                  <span className="ml-2 font-semibold">{result.shouldWater ? 'Oui' : 'Non'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Modèle utilisé:</span>
                  <span className="ml-2 font-semibold text-xs">{result.modelUsed}</span>
                </div>
              </div>
            </div>

            {/* Recommandations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-blue-900">Recommandations</h4>
                </div>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-blue-600 text-xl mt-0.5">•</span>
                      <span className="text-blue-800 flex-1">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Métadonnées */}
            <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
              <p><strong>Horodatage:</strong> {new Date(result.timestamp).toLocaleString('fr-FR')}</p>
              <p className="mt-1">
                <strong>État backend:</strong> 
                <span className={result.backend_sent ? 'text-green-600 ml-2' : 'text-orange-600 ml-2'}>
                  {result.backend_sent ? '✓ Envoyé' : '✗ Non envoyé'}
                </span>
              </p>
            </div>

            {/* Bouton nouvelle analyse */}
            <Button
              variant="secondary"
              size="lg"
              onClick={handleClear}
              className="w-full"
            >
              Analyser une nouvelle image
            </Button>
          </div>
        </Card>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">ℹ️ Information</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• L'image est envoyée directement au serveur IA Python (port 5001)</li>
          <li>• L'analyse se fait sans stockage dans le backend Node.js</li>
          <li>• Les résultats sont affichés localement dans votre navigateur</li>
          <li>• Le serveur IA peut optionnellement envoyer les résultats au backend</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploadIA;