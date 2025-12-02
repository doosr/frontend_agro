import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Image } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const ImageUploadIA = ({ onAnalysisComplete }) => {
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
        if (onAnalysisComplete) {
          onAnalysisComplete(data);
        }
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
    </div>
  );
};

export default ImageUploadIA;