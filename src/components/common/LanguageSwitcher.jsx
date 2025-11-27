import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
    };

    useEffect(() => {
        // Set initial direction based on current language
        document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-gray-200">
            <Globe className="w-4 h-4 text-gray-500 ml-2" />
            <div className="flex space-x-1">
                <button
                    onClick={() => changeLanguage('fr')}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${i18n.language === 'fr'
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    FR
                </button>
                <button
                    onClick={() => changeLanguage('en')}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${i18n.language === 'en'
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    EN
                </button>
                <button
                    onClick={() => changeLanguage('ar')}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${i18n.language === 'ar'
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    AR
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
