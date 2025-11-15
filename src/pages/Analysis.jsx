import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import ImageUpload from '../components/analysis/ImageUpload';
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
    fetchImages();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analyse IA des Plantes</h1>
        <p className="text-gray-600 mt-2">Détection automatique des maladies par intelligence artificielle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
        {selectedImage && <DiagnosticResult result={selectedImage} />}
      </div>

      <Card title="Analyses Récentes" icon={ImageIcon}>
        {loading ? (
          <Loader />
        ) : images.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Aucune analyse disponible</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img._id}
                onClick={() => setSelectedImage(img)}
                className="cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}/${img.path}`}
                    alt="Analyse"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  {img.analysed && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-xs">
                      {img.resultatAnalyse?.maladie}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Analysis;