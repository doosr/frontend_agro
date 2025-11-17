import api from "../config/api";

const alertService = {
  getAlerts() {
    return api.get("/api/alert");
  },

  markAsRead(id) {
    return api.put(`/api/alert/${id}/read`);
  },

  deleteAlert(id) {
    return api.delete(`/api/alert/${id}`);
  }
};

export default alertService;
