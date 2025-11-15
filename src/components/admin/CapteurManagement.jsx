import React, { useState, useEffect } from 'react';
import { Wifi, Edit, Trash2, Plus, MapPin, Circle, User } from 'lucide-react';
import api from '../../config/api';
import Button from '../common/Button';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { toast } from 'react-toastify';

const CapteurManagement = () => {
  const [users, setUsers] = useState([]);
  const [capteurs, setCapteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCapteur, setEditingCapteur] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    macAddress: '',
    localisation: '',
    userId: ''
  });

  useEffect(() => {
    fetchCapteurs();
  }, []);

  const fetchCapteurs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/capteur');
      setCapteurs(response.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des capteurs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCapteur) {
        await api.put(`/capteur/${editingCapteur._id}`, formData);
        toast.success('Capteur modifié avec succès');
      } else {
        await api.post('/capteur', formData);
        toast.success('Capteur ajouté avec succès');
      }
      
      setShowModal(false);
      setEditingCapteur(null);
      setFormData({ nom: '', macAddress: '', localisation: '', userId: '' });
      fetchCapteurs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'opération');
    }
  };

  const deleteCapteur = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce capteur ?')) {
      return;
    }

    try {
      await api.delete(`/capteur/${id}`);
      toast.success('Capteur supprimé avec succès');
      fetchCapteurs();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const openEditModal = (capteur) => {
    setEditingCapteur(capteur);
    setFormData({
      nom: capteur.nom,
      macAddress: capteur.macAddress,
      localisation: capteur.localisation || '',
      userId: capteur.userId
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <Card 
        title="Gestion des Capteurs" 
        subtitle={`${capteurs.length} capteur(s) total`}
        icon={Wifi}
        headerAction={
          <Button
            icon={Plus}
            onClick={() => {
              setEditingCapteur(null);
              setFormData({ nom: '', macAddress: '', localisation: '', userId: '' });
              setShowModal(true);
            }}
          >
            Nouveau Capteur
          </Button>
        }
      >
        {/* Grille des capteurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : capteurs.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Aucun capteur configuré
            </div>
          ) : (
            capteurs.map((capteur) => (
              <div
                key={capteur._id}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full ${
                      capteur.actif ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <h4 className="font-semibold text-gray-900">{capteur.nom}</h4>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => openEditModal(capteur)}
                      className="p-1 text-gray-400 hover:text-primary-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteCapteur(capteur._id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Wifi className="h-4 w-4 mr-2" />
                    <span className="font-mono text-xs">{capteur.macAddress}</span>
                  </div>
                  {capteur.localisation && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{capteur.localisation}</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    Ajouté le {new Date(capteur.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Modal Ajout/Modification */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingCapteur ? 'Modifier le capteur' : 'Nouveau capteur'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom du capteur"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            placeholder="Ex: Capteur Serre 1"
            required
          />
          
          <Input
            label="Adresse MAC"
            value={formData.macAddress}
            onChange={(e) => setFormData({ ...formData, macAddress: e.target.value })}
            placeholder="Ex: AA:BB:CC:DD:EE:FF"
            required
            disabled={editingCapteur !== null}
          />
          
          <Input
            label="Localisation"
            value={formData.localisation}
            onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
            placeholder="Ex: Serre Nord"
          />
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Annuler
            </Button>
            <Button type="submit">
              {editingCapteur ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SensorManagement;