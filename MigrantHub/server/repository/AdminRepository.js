const Admin = require('../models/Admin');

module.exports = {
  createAdmin(adminUserObject) {
    const admin = new Admin();
    admin._id = adminUserObject.email;
    admin.email = adminUserObject.email;
    admin.localAuthentication = {
      password: adminUserObject.password,
    };

    return admin.save().then(() => Promise.resolve('Admin User has been created.')).catch(() => {
      throw new Error('There was an error creating admin.');
    });
  },

  getAdmins(query) {
      return Admin.find(query, 'email').exec().then(admins => Promise.resolve(admins)).catch(() => {
          throw new Error('There was an error retrieving unapproved admins.');
      });
  },

  updateAdminStatus(adminId, query) {
      return Admin.updateOne({ _id: adminId }, query).exec().then(() => Promise.resolve('Admin has been deleted.')).catch(() => {
          throw new Error('There was an error deleting admin.');
      });
  },
};
