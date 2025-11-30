import React, { useState, useEffect } from 'react';
import { Users, Trash2, Edit, Search, UserPlus, Check, X, Mail } from 'lucide-react';
import api from '../../config/api';
import Button from '../common/Button';
import Card from '../common/Card';
import Modal from '../common/Modal';
import Input from '../common/Input';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // État pour le formulaire de création
  const [newUser, setNewUser] = useState({
    nom: '',
    email: '',
    password: '',
    role: 'agriculteur',
    telephone: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user');
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      await api.delete(`/user/${userId}`);
      toast.success('Utilisateur supprimé avec succès');
      fetchUsers();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const toggleEmailVerification = async (userId, currentStatus) => {
    try {
      console.log('Tentative de modification du statut email pour:', userId);
      const response = await api.patch(`/user/${userId}/verify-email`);
      console.log('Réponse backend:', response.data);
      toast.success(`Email ${!currentStatus ? 'vérifié' : 'non vérifié'} avec succès`);
      fetchUsers();
    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('Réponse erreur:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la modification du statut";
      toast.error(errorMessage);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/user/create', newUser);
      toast.success('Utilisateur créé avec succès');
      setShowAddModal(false);
      setNewUser({ nom: '', email: '', password: '', role: 'agriculteur', telephone: '' });
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la création");
    }
  };

  // Filtrer les utilisateurs (recherche + exclure admin)
  const filteredUsers = users.filter(user =>
    user.role !== 'admin' && // Exclure les admins
    (user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <Card
        title="Gestion des Utilisateurs"
        subtitle={`${filteredUsers.length} utilisateur(s)`}
        icon={Users}
        headerAction={
          <Button
            icon={UserPlus}
            onClick={() => setShowAddModal(true)}
          >
            Nouvel Utilisateur
          </Button>
        }
      >
        {/* Barre de recherche */}
        <div className="mb-6">
          <Input
            icon={Search}
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tableau des utilisateurs */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Vérifié
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {user.nom.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.nom}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.telephone || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => toggleEmailVerification(user._id, user.emailVerified)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.emailVerified
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          } transition-colors duration-200`}
                        title="Cliquer pour changer le statut"
                      >
                        {user.emailVerified ? (
                          <>
                            <Check className="w-3 h-3 mr-1" /> Vérifié
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3 mr-1" /> Non vérifié
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer l'utilisateur"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Création Utilisateur */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Créer un nouvel utilisateur"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <Input
            label="Nom complet"
            value={newUser.nom}
            onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
            required
            placeholder="Jean Dupont"
          />
          <Input
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
            placeholder="jean@example.com"
          />
          <Input
            label="Mot de passe"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
            placeholder="••••••••"
          />
          <Input
            label="Téléphone"
            value={newUser.telephone}
            onChange={(e) => setNewUser({ ...newUser, telephone: e.target.value })}
            placeholder="+33 6 12 34 56 78"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="agriculteur">Agriculteur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddModal(false)}
            >
              Annuler
            </Button>
            <Button type="submit">
              Créer l'utilisateur
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;