const qs = require('qs');
const MigrantUserService = require('../service/MigrantUserService');


module.exports = {
  async getMigrantUser(migrantUserId) {
      return MigrantUserService.getMigrantUser(migrantUserId);
  },

  async editMigrantUser(migrantUserId, migrantUserObject){
      const parsedMigrantUserObject = qs.parse(migrantUserObject);
      return MigrantUserService.editMigrantUser(migrantUserId, parsedMigrantUserObject);
  },
};
