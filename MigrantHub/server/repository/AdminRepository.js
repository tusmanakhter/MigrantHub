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
      throw new Error('Admin User has been created.');
    });
  },
};
