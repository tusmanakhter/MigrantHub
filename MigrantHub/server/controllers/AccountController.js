const qs = require('qs');
const AccountService = require('../service/AccountService');

module.exports = {
  async createUser(migrantUserObject) {
    const parsedMigrantUserObject = qs.parse(migrantUserObject);
    return AccountService.createUser(parsedMigrantUserObject);
  },

  async createBusiness(businessUserObject) {
    const parsedMigrantUserObject = qs.parse(businessUserObject);
    return AccountService.createBusiness(parsedMigrantUserObject);
  },

  async createAdmin(adminUserObject) {
    const parsedAdminUserObject = qs.parse(adminUserObject);
    return AccountService.createAdmin(parsedAdminUserObject);
  },

  async getUserType(user) {
    if (user) {
      const userObject = {
        email: user._id,
        type: user.type,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return Promise.resolve(userObject);
    }
    throw new Error('Error retrieving user.');
  },

  async getUser(userObject) {
    if (userObject) {
      return Promise.resolve({ user: userObject });
    }
    return Promise.resolve({ user: null });
  },
};
