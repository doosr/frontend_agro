import React, { useState } from 'react';
import { User, Mail, Phone, Save } from 'lucide-react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, setUser } = useAuth(); // Récupérer setUser pour mettre à jour le contexte
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    email: user?.email || '',
    telephone: user?.telephone || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await api.put('/user/profile', formData); // L'API doit renvoyer l'utilisateur mis à jour
      toast.success('Profil mis à jour avec succès');

      // Mettre à jour le contexte pour que l'UI reflète les nouvelles valeurs
      setUser(response.data);

      // Mettre à jour le formulaire local également
      setFormData({
        nom: response.data.nom,
        email: response.data.email,
        telephone: response.data.telephone
      });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600 mt-2">Gérez vos informations personnelles</p>
      </div>

      <Card title="Informations Personnelles" icon={User}>
        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary-600 text-white rounded-full h-24 w-24 flex items-center justify-center text-4xl font-bold">
              {formData.nom?.charAt(0).toUpperCase()}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nom complet"
              type="text"
              icon={User}
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            />

            <Input
              label="Email"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled
            />

            <Input
              label="Téléphone"
              type="tel"
              icon={Phone}
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            />

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Rôle</p>
              <p className="text-lg font-semibold text-primary-600 capitalize">{user?.role}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Statut Email</p>
              <div className="flex items-center mt-1">
                {user?.isEmailVerified ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <p className="text-sm text-green-700">Email vérifié</p>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    <p className="text-sm text-yellow-700">Email non vérifié</p>
                  </>
                )}
              </div>
            </div>

            <Button 
              type="submit"
              variant="primary" 
              icon={Save} 
              loading={loading}
              className="w-full"
            >
              Enregistrer les modifications
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
