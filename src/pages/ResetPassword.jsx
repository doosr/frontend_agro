import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Leaf, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
    const { t } = useTranslation();
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error(t('resetPassword.invalidToken'));
            navigate('/login');
        }
    }, [token, navigate, t]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = t('resetPassword.passwordRequired');
        } else if (formData.password.length < 6) {
            newErrors.password = t('resetPassword.passwordMinLength');
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t('resetPassword.confirmPasswordRequired');
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('resetPassword.passwordMismatch');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            const response = await authService.resetPassword(token, formData.password);

            toast.success(t('resetPassword.success'));

            // Si l'API retourne un token, l'utilisateur est automatiquement connecté
            if (response.token) {
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            console.error('Erreur reset password:', error);
            const errorMessage = error.response?.data?.message || t('resetPassword.error');
            toast.error(errorMessage);

            // Si le token est invalide ou expiré, rediriger vers forgot-password
            if (error.response?.status === 400) {
                setTimeout(() => navigate('/forgot-password'), 3000);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
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
                    <h1 className="text-3xl font-bold text-gray-900">{t('resetPassword.title')}</h1>
                    <p className="text-gray-600 mt-2">{t('resetPassword.subtitle')}</p>
                </div>

                {/* Formulaire */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <Input
                                label={t('resetPassword.newPassword')}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder={t('resetPassword.passwordPlaceholder')}
                                icon={Lock}
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="relative">
                            <Input
                                label={t('resetPassword.confirmPassword')}
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                                icon={Lock}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            className="w-full"
                        >
                            {loading ? t('common.loading') : t('resetPassword.submit')}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('resetPassword.backToLogin')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
