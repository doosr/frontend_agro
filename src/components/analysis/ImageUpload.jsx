import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import api from '../../config/api';
import { toast } from 'react-toastify';

const ImageUpload = ({ onAnalysisComplete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image valide');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await api.post('/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Image analysée avec succès');
      onAnalysisComplete?.(response.data.data);
      
      // Reset
      setSelectedImage(null);
      setPreview(null);
    } catch (error) {
      toast.error('Erreur lors de l\'analyse de l\'image');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card title="Analyser une Image" icon={Camera}>
      <div className="space-y-4">
        {/* Zone de dépôt */}
        {!preview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
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
        {preview && (
          <Button
            variant="primary"
            icon={Upload}
            onClick={handleUpload}
            loading={loading}
            className="w-full"
          >
            Analyser l'image
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ImageUpload;