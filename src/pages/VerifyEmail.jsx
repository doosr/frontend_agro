import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import api from '../config/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Vérification de votre email en cours...');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await api.get(`/auth/verify-email/${token}`);

                if (response.data.success) {
                    setStatus('success');
                    setMessage('Votre email a été vérifié avec succès !');

                    // Si le backend renvoie un token et un user, on peut connecter l'utilisateur directement
                    if (response.data.token && response.data.user) {
                        localStorage.setItem('token', response.data.token);
                        setUser(response.data.user);
                        toast.success('Email vérifié et connexion réussie !');

                        // Redirection après 3 secondes
                        setTimeout(() => {
                            navigate('/app/dashboard');
                        }, 3000);
                    } else {
                        // Sinon redirection vers login
                        setTimeout(() => {
                            navigate('/login');
                        }, 3000);
                    }
                }
            } catch (error) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Le lien de vérification est invalide ou a expiré.');
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token, navigate, setUser]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    {status === 'verifying' && (
                        <div className="flex flex-col items-center">
                            <Loader className="h-12 w-12 text-primary-600 animate-spin mb-4" />
                            <h2 className="text-xl font-medium text-gray-900">Vérification en cours...</h2>
                            <p className="mt-2 text-gray-500">{message}</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex flex-col items-center">
                            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                            <h2 className="text-xl font-medium text-gray-900">Email Vérifié !</h2>
                            <p className="mt-2 text-gray-500">{message}</p>
                            <p className="mt-4 text-sm text-gray-400">Vous allez être redirigé...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="flex flex-col items-center">
                            <XCircle className="h-12 w-12 text-red-500 mb-4" />
                            <h2 className="text-xl font-medium text-gray-900">Échec de la vérification</h2>
                            <p className="mt-2 text-gray-500">{message}</p>
                            <button
                                onClick={() => navigate('/login')}
                                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Retour à la connexion
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
