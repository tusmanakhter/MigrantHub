const Admin = require('../models/Admin');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  createAdmin(adminUserObject) {
    const admin = new Admin();
    admin._id = adminUserObject.email;
    admin.email = adminUserObject.email;
    admin.userType = 'local';
    admin.localAuthentication = {
      password: adminUserObject.password,
    };

    return admin.save().then(() => Promise.resolve('Admin User has been created.')).catch((error) => {
      throw new ServerError('There was an error creating admin.', 400, error);
    });
  },

  getAdmins(query) {
    return Admin.find(query, 'email').exec().then(admins => Promise.resolve(admins)).catch((error) => {
      throw new ServerError('There was an error retrieving admins.', 400, error);
    });
  },

  updateAdminStatus(adminId, query) {
    return Admin.updateOne({ _id: adminId }, query).exec().then(() => Promise.resolve('Admin has been updated.')).catch((error) => {
      throw new ServerError('There was an error updating admin.', 400, error);
    });
  },
};
