import api from '../config/api';

const reminderService = {
    /**
     * Créer un rappel pour une alerte
     * @param {string} alertId - ID de l'alerte
     * @param {number} duration - Durée en minutes (5, 15, 60, 1440)
     */
    async createReminder(alertId, duration) {
        try {
            const response = await api.post('/reminders', {
                alertId,
                snoozeDuration: duration
            });
            return response.data;
        } catch (error) {
            console.error('Erreur createReminder:', error);
            throw error;
        }
    },

    /**
     * Reporter une alerte (snooze)
     * @param {string} alertId - ID de l'alerte
     * @param {number} duration - Durée en minutes
     */
    async snoozeAlert(alertId, duration) {
        try {
            const response = await api.post(`/reminders/snooze/${alertId}`, {
                duration
            });
            return response.data;
        } catch (error) {
            console.error('Erreur snoozeAlert:', error);
            throw error;
        }
    },

    /**
     * Récupérer les rappels de l'utilisateur
     * @param {string} status - Statut des rappels (pending, sent, cancelled)
     */
    async getReminders(status = 'pending') {
        try {
            const response = await api.get('/reminders', {
                params: { status }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur getReminders:', error);
            throw error;
        }
    },

    /**
     * Annuler un rappel
     * @param {string} reminderId - ID du rappel
     */
    async cancelReminder(reminderId) {
        try {
            const response = await api.delete(`/reminders/${reminderId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur cancelReminder:', error);
            throw error;
        }
    },

    /**
     * Obtenir les durées de snooze disponibles
     */
    getSnoozeDurations() {
        return [
            { label: '5 minutes', value: 5 },
            { label: '15 minutes', value: 15 },
            { label: '1 heure', value: 60 },
            { label: '1 jour', value: 1440 }
        ];
    }
};

export default reminderService;
