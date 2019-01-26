const qs = require('qs');
const AccountService = require('../service/AccountService');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  async createUser(migrantUserObject) {
    const parsedMigrantUserObject = qs.parse(migrantUserObject);
    return AccountService.createUser(parsedMigrantUserObject);
  },

  async createBusiness(businessUserObject) {
    const parsedBusinessUserObject = qs.parse(businessUserObject);
    return AccountService.createBusiness(parsedBusinessUserObject);
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
    throw new ServerError('Error retrieving user.', 400, `User value: ${user}`);
  },

  async getCurrentUser(userObject) {
    if (userObject) {
      return Promise.resolve({ user: userObject });
    }
    return Promise.resolve({ user: null });
  },

  async getUser(userEmail) {
    return AccountService.getUser(userEmail);
  },

  async forgotPassword(userEmail) {
    return AccountService.forgotPassword(userEmail);
  },

  async resetPassword(userEmail, userPassword, token) {
    return AccountService.resetPassword(userEmail, userPassword, token);
  },
};
