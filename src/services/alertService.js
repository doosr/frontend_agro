import api from "../config/api";

const alertService = {
  getAlerts() {
    return api.get("/alert");
  },

  markAsRead(id) {
    return api.put(`/alert/${id}/read`);
  }
};

export default alertService;
