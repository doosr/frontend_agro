import api from "../config/api";

const alertService = {
  getAlerts() {
    return api.get("/alert");
  },

  markAsRead(id) {
    return api.put(`/alert/${id}/read`);
  },

  deleteAlert(id) { // ✅ Add this method
    return api.delete(`/alert/${id}`);
  }
};

export default alertService;