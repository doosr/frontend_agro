import api from '../config/api';

const imageService = {
  async uploadImage(file, capteurId = null) {
    const formData = new FormData();
    formData.append('image', file);
    if (capteurId) {
      formData.append('capteurId', capteurId);
    }

    const response = await api.post('/image/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getImages(params = {}) {
    const response = await api.get('/image/list', { params });
    return response.data;
  },

  async getImageById(id) {
    const response = await api.get(`/image/${id}`);
    return response.data;
  },

  getImageUrl(path) {
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/${path}`;
  }
};

export default imageService;