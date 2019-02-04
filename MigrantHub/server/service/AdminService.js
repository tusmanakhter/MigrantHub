const AdminRepository = require('../repository/AdminRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  async getAdmins(user) {
    let query = {};
    if (user) {
      query = {
        _id: { $ne: user._id }, authorized: true, rejected: false, deleted: false,
      };
    }
    return AdminRepository.getAdmins(query);
  },

  async getDeletedAdmins() {
    const query = { deleted: true };
    return AdminRepository.getAdmins(query);
  },

  async getRejectedAdmins() {
    const query = { authorized: false, rejected: true };
    return AdminRepository.getAdmins(query);
  },

  async getUnapprovedAdmins() {
    const query = { authorized: false, rejected: false, deleted: false };
    return AdminRepository.getAdmins(query);
  },

  async reactivateAdmin(adminId) {
    const query = { authorized: true, deleted: false, deletedDate: null };
    return AdminRepository.updateAdminStatus(adminId, query);
  },

  async approveAdmin(adminId) {
    const query = { authorized: true, rejected: false, rejectedDate: null };
    return AdminRepository.updateAdminStatus(adminId, query);
  },

  async rejectAdmin(adminId) {
    const query = { rejected: true, rejectedDate: Date.now() };
    return AdminRepository.updateAdminStatus(adminId, query);
  },

  async deleteAdmin(user, adminId) {
    if (user._id === adminId) {
      throw new ServerError('You cannot delete yourself.', 400, `Admin ${user._id} tried to delete ${adminId}`);
    }
    const query = { authorized: false, deleted: true, deletedDate: Date.now() };
    return AdminRepository.updateAdminStatus(adminId, query);
  },
};
