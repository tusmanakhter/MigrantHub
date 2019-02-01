const AdminService = require('../service/AdminService');

module.exports = {
  async getAdmins(user) {
    return AdminService.getAdmins(user);
  },

  async getAllAdmins() {
    return AdminService.getAdmins();
  },

  async getDeletedAdmins() {
    return AdminService.getDeletedAdmins();
  },

  async getRejectedAdmins() {
    return AdminService.getRejectedAdmins();
  },

  async getUnapprovedAdmins() {
    return AdminService.getUnapprovedAdmins();
  },

  async reactivateAdmin(adminId) {
    return AdminService.reactivateAdmin(adminId);
  },

  async approveAdmin(adminId) {
    return AdminService.approveAdmin(adminId);
  },

  async rejectAdmin(adminId) {
    return AdminService.rejectAdmin(adminId);
  },

  async deleteAdmin(user, adminId) {
    return AdminService.deleteAdmin(user, adminId);
  },
};
