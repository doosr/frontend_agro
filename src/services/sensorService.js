import api from '../config/api';

const sensorService = {
  async getLatestData() {
    const response = await api.get('/sensor/latest');
    return response.data;
  },

  async getSensorData(params = {}) {
    const response = await api.get('/sensor/data', { params });
    return response.data;
  },

  async getStats(period = '24h') {
    const response = await api.get('/sensor/stats', { params: { period } });
    return response.data;
  }
};

export default sensorService;
