const qs = require('qs');
const MigrantUserService = require('../service/MigrantService');


module.exports = {
  async getMigrantUser(migrantUserId) {
    return MigrantUserService.getMigrantUser(migrantUserId);
  },

  async editMigrantUser(migrantUserId, migrantUserObject) {
    const parsedMigrantUserObject = qs.parse(migrantUserObject);
    return MigrantUserService.editMigrantUser(migrantUserId, parsedMigrantUserObject);
  },

  async onBoardingComplete(migrantUserId) {
    return MigrantUserService.onBoardingComplete(migrantUserId);
  },

  async updateOnBoardingComplete(migrantUserId) {
    return MigrantUserService.updateOnBoardingComplete(migrantUserId);
  },
};
