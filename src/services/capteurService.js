import api from '../config/api';

const capteurService = {
  async getCapteurs() {
    const response = await api.get('/capteur');
    return response.data;
  },

  async addCapteur(capteurData) {
    const response = await api.post('/capteur', capteurData);
    return response.data;
  },

  async updateCapteur(id, capteurData) {
    const response = await api.put(`/capteur/${id}`, capteurData);
    return response.data;
  },

  async deleteCapteur(id) {
    const response = await api.delete(`/capteur/${id}`);
    return response.data;
  }
};

export default capteurService;