import React, { useState, useEffect } from 'react';
import { Radio, Plus, Edit, Trash2, User, MapPin, Wifi } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import api from '../config/api';
import { toast } from 'react-toastify';

const CapteursAdmin = () => {
  const [capteurs, setCapteurs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCapteur, setEditingCapteur] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    macAddress: '',
    localisation: '',
    userId: '',
    type: 'ESP32-CAM'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [capteursResponse, usersResponse] = await Promise.all([
        api.get('/capteur'),
        api.get('/user')
      ]);
      setCapteurs(capteursResponse.data.data || []);
      setUsers(usersResponse.data.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (capteur = null) => {
    if (capteur) {
      setEditingCapteur(capteur);
      setFormData({
        nom: capteur.nom,
        macAddress: capteur.macAddress,
        localisation: capteur.localisation || '',
        userId: capteur.userId?._id || '',
        type: capteur.type || 'ESP32-CAM'
      });
    } else {
      setEditingCapteur(null);
      setFormData({
        nom: '',
        macAddress: '',
        localisation: '',
        userId: '',
        type: 'ESP32-CAM'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCapteur(null);
    setFormData({
      nom: '',
      macAddress: '',
      localisation: '',
      userId: '',
      type: 'ESP32-CAM'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCapteur) {
        // Mise à jour
        await api.put(`/capteur/${editingCapteur._id}`, formData);
        toast.success('Capteur modifié avec succès');
      } else {
        // Création
        await api.post('/capteur', formData);
        toast.success('Capteur ajouté avec succès');
      }
      closeModal();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'opération');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce capteur ?')) {
      return;
    }

    try {
      await api.delete(`/capteur/${id}`);
      toast.success('Capteur supprimé avec succès');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const toggleStatus = async (capteur) => {
    try {
      await api.put(`/capteur/${capteur._id}`, {
        actif: !capteur.actif
      });
      toast.success(`Capteur ${!capteur.actif ? 'activé' : 'désactivé'}`);
      fetchData();
    } catch (error) {
      toast.error('Erreur lors du changement de statut');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="lg" text="Chargement des capteurs..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Capteurs</h1>
          <p className="text-gray-600 mt-2">Gérez les capteurs IoT de tous les utilisateurs</p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => openModal()}
        >
          Nouveau capteur
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Capteurs</p>
              <p className="text-3xl font-bold text-gray-900">{capteurs.length}</p>
            </div>
            <Radio className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Capteurs Actifs</p>
              <p className="text-3xl font-bold text-green-600">
                {capteurs.filter(c => c.actif).length}
              </p>
            </div>
            <Wifi className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Capteurs Inactifs</p>
              <p className="text-3xl font-bold text-red-600">
                {capteurs.filter(c => !c.actif).length}
              </p>
            </div>
            <Radio className="h-12 w-12 text-red-500" />
          </div>
        </div>
      </div>

      <Card title="Liste des Capteurs" icon={Radio}>
        {capteurs.length === 0 ? (
          <div className="text-center py-12">
            <Radio className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Aucun capteur configuré</p>
            <Button variant="primary" icon={Plus} onClick={() => openModal()}>
              Ajouter le premier capteur
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capteur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localisation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {capteurs.map((capteur) => (
                  <tr key={capteur._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          capteur.actif ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <Radio className={`h-5 w-5 ${
                            capteur.actif ? 'text-green-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{capteur.nom}</div>
                          <div className="text-xs text-gray-500">{capteur.macAddress}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {capteur.userId ? (
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm text-gray-900">{capteur.userId.nom}</div>
                            <div className="text-xs text-gray-500">{capteur.userId.email}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Non assigné</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {capteur.localisation ? (
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          {capteur.localisation}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {capteur.type || 'ESP32-CAM'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(capteur)}
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full cursor-pointer transition-colors ${
                          capteur.actif 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {capteur.actif ? '🟢 Actif' : '🔴 Inactif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Edit}
                        onClick={() => openModal(capteur)}
                      >
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        icon={Trash2}
                        onClick={() => handleDelete(capteur._id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal Ajout/Modification Capteur */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCapteur ? 'Modifier le capteur' : 'Ajouter un capteur'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom du capteur"
            placeholder="Ex: Capteur Serre 1"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
          />

          <Input
            label="Adresse MAC"
            placeholder="Ex: 24:6F:28:XX:XX:XX"
            value={formData.macAddress}
            onChange={(e) => setFormData({ ...formData, macAddress: e.target.value })}
            required
            disabled={editingCapteur} // Ne pas modifier le MAC d'un capteur existant
          />

          <Input
            label="Localisation"
            placeholder="Ex: Serre A - Zone Nord"
            value={formData.localisation}
            onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de capteur
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="ESP32-CAM">ESP32-CAM (Caméra + Capteurs)</option>
              <option value="ESP32">ESP32 (Capteurs uniquement)</option>
              <option value="Arduino">Arduino</option>
              <option value="Raspberry Pi">Raspberry Pi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assigner à un utilisateur
            </label>
            <select
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">-- Sélectionner un utilisateur --</option>
              {users.filter(u => u.role === 'agriculteur').map((user) => (
                <option key={user._id} value={user._id}>
                  {user.nom} ({user.email})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Seuls les agriculteurs peuvent avoir des capteurs
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Information</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• L'adresse MAC doit être unique</li>
              <li>• Le capteur sera visible par l'utilisateur assigné</li>
              <li>• Les données seront automatiquement liées à ce capteur</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              {editingCapteur ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CapteursAdmin;