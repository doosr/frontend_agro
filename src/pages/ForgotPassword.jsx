import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Leaf, ArrowLeft } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("L'email est requis");
            return;
        }

        try {
            setLoading(true);
            setError('');
            // Appel au service (à implémenter)
            await authService.forgotPassword(email);
            toast.success('Si un compte existe avec cet email, vous recevrez les instructions de réinitialisation.');
            // Optionnel : rediriger vers login après un délai
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            console.error('Erreur forgot password:', error);
            // Pour des raisons de sécurité, on affiche souvent le même message même si l'email n'existe pas
            // Mais ici on peut afficher l'erreur si besoin pour le debug
            toast.error(error.response?.data?.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="absolute top-4 right-4">
                <LanguageSwitcher />
            </div>
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                        <Leaf className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{t('forgotPassword.title')}</h1>
                    <p className="text-gray-600 mt-2">{t('forgotPassword.subtitle')}</p>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label={t('login.email')}
                            type="email"
                            name="email"
                            placeholder="votre@email.com"
                            icon={Mail}
                            value={email}
                            onChange={handleChange}
                            error={error}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            className="w-full"
                        >
                            {loading ? t('common.loading') : t('forgotPassword.sendInstructions')}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('forgotPassword.backToLogin')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
