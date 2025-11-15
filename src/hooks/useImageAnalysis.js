import { useState } from 'react';
import api from '../config/api';
import { toast } from 'react-toastify';

export const useImageAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeImage = async (imageFile) => {
    if (!imageFile) {
      toast.error('Aucune image fournie');
      return null;
    }

    try {
      setAnalyzing(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await api.post('/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data.data);
      toast.success('Analyse terminée avec succès');
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erreur lors de l\'analyse';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return {
    analyzeImage,
    analyzing,
    result,
    error,
    resetAnalysis
  };
};