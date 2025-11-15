import React, { useState } from 'react';
import { Image, Search, Filter, Calendar } from 'lucide-react';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ImageGallery = ({ images, onImageSelect }) => {
  const [filter, setFilter] = useState('all'); // all, sain, malade
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = images.filter(img => {
    if (filter === 'all') return true;
    if (filter === 'sain') return img.resultatAnalyse?.maladie === 'Sain';
    if (filter === 'malade') return img.resultatAnalyse?.maladie !== 'Sain';
    return true;
  });

  const getSeverityColor = (maladie) => {
    return maladie === 'Sain' ? 'success' : 'danger';
  };

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Toutes les images</option>
            <option value="sain">Plantes saines</option>
            <option value="malade">Plantes malades</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">
          {filteredImages.length} image{filteredImages.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille d'images */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune image trouvée</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <div
              key={img._id}
              onClick={() => {
                setSelectedImage(img);
                onImageSelect?.(img);
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-100">
                <img
                  src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}/${img.path}`}
                  alt="Analyse"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <Search className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Badge résultat */}
                {img.analysed && img.resultatAnalyse && (
                  <div className="absolute top-2 right-2">
                    <Badge variant={getSeverityColor(img.resultatAnalyse.maladie)}>
                      {img.resultatAnalyse.maladie}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="mt-2 text-xs text-gray-600 flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(img.timestamp), 'dd/MM/yyyy', { locale: fr })}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal détails */}
      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          title="Détails de l'analyse"
          size="lg"
        >
          <div className="space-y-4">
            <img
              src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}/${selectedImage.path}`}
              alt="Détails"
              className="w-full rounded-lg"
            />
            {selectedImage.resultatAnalyse && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Diagnostic</span>
                  <Badge variant={getSeverityColor(selectedImage.resultatAnalyse.maladie)} size="lg">
                    {selectedImage.resultatAnalyse.maladie}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Confiance</span>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">
                        {(selectedImage.resultatAnalyse.confiance * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${selectedImage.resultatAnalyse.confiance * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageGallery;