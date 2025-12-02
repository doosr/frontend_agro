import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import ImageUploadIA from '../components/analysis/ImageUploadIA';
import DiagnosticResult from '../components/analysis/DiagnosticResult';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import api from '../config/api';

const Analysis = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await api.get('/image/list', { params: { limit: 10 } });
      setImages(response.data.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysisComplete = (result) => {
    setSelectedImage(result);
    // Optionnel: rafraîchir les images si elles sont stockées dans le backend
    // fetchImages();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analyse IA des Plantes</h1>
        <p className="text-gray-600 mt-2">Détection automatique des maladies par intelligence artificielle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ImageUploadIA onAnalysisComplete={handleAnalysisComplete} />
        {selectedImage && <DiagnosticResult result={selectedImage} />}
      </div>
    </div>
  );
};

export default Analysis;