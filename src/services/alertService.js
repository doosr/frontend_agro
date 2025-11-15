import api from '../config/api';

const alertService = {
  async getAlerts(params = {}) {
    const response = await api.get('/alert', { params });
    return response.data;
  },

  async markAsRead(alertId) {
    const response = await api.put(`/alert/${alertId}/read`);
    return response.data;
  },

  async deleteAlert(alertId) {
    const response = await api.delete(`/alert/${alertId}`);
    return response.data;
  },

  async getUnreadCount() {
    const response = await api.get('/alert', { params: { lu: false } });
    return response.data.unreadCount;
  }
};

export default alertService;