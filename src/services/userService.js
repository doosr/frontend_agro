import api from '../config/api';

const userService = {
  async getUsers() {
    const response = await api.get('/user');
    return response.data;
  },

  async updateSettings(settings) {
    const response = await api.put('/user/settings', settings);
    return response.data;
  },

  async controlIrrigation(action) {
    const response = await api.post('/user/irrigation', { action });
    return response.data;
  },

  async deleteUser(userId) {
    const response = await api.delete(`/user/${userId}`);
    return response.data;
  }
};

export default userService;