import React, { useState, useEffect } from 'react';
import { Clock, X, Bell, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-toastify';
import Card from '../common/Card';
import reminderService from '../../services/reminderService';

const NotificationReminderPanel = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadReminders();
        // Recharger les rappels toutes les 30 secondes
        const interval = setInterval(loadReminders, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadReminders = async () => {
        try {
            const response = await reminderService.getReminders('pending');
            if (response.success) {
                setReminders(response.data);
            }
        } catch (error) {
            console.error('Erreur chargement rappels:', error);
        }
    };

    const handleCancelReminder = async (reminderId) => {
        try {
            setLoading(true);
            const response = await reminderService.cancelReminder(reminderId);
            if (response.success) {
                toast.success('Rappel annulé');
                loadReminders();
            }
        } catch (error) {
            toast.error('Erreur lors de l\'annulation du rappel');
        } finally {
            setLoading(false);
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical':
                return 'bg-red-100 border-red-300 text-red-800';
            case 'warning':
                return 'bg-yellow-100 border-yellow-300 text-yellow-800';
            default:
                return 'bg-blue-100 border-blue-300 text-blue-800';
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'critical':
                return <AlertCircle className="h-5 w-5 text-red-600" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-600" />;
            default:
                return <Bell className="h-5 w-5 text-blue-600" />;
        }
    };

    if (reminders.length === 0) {
        return null;
    }

    return (
        <Card title="Rappels de Notifications" icon={Clock}>
            <div className="space-y-3">
                {reminders.map((reminder) => {
                    const alert = reminder.alertId;
                    const timeUntil = formatDistanceToNow(new Date(reminder.reminderTime), {
                        addSuffix: true,
                        locale: fr
                    });

                    return (
                        <div
                            key={reminder._id}
                            className={`border rounded-lg p-4 ${getSeverityColor(alert?.severite || 'info')}`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                    {getSeverityIcon(alert?.severite)}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">
                                            {alert?.titre || 'Rappel'}
                                        </h4>
                                        <p className="text-xs mt-1 opacity-90">
                                            {reminder.message}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Clock className="h-3 w-3" />
                                            <span className="text-xs font-medium">
                                                {timeUntil}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCancelReminder(reminder._id)}
                                    disabled={loading}
                                    className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                    title="Annuler le rappel"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default NotificationReminderPanel;
