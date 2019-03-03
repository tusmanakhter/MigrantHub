const MigrantRepository = require('../repository/MigrantRepository');


module.exports = {
  async getMigrantUser(migrantUserId) {
    return MigrantRepository.getMigrantUser(migrantUserId);
  },

  async editMigrantUser(migrantUserId, parsedMigrantUserObject) {
    const migrantUserObject = parsedMigrantUserObject;

    if (migrantUserObject.languages === undefined) {
      migrantUserObject.languages = [];
    }

    if (migrantUserObject.workExperience === undefined) {
      migrantUserObject.workExperience = [];
    }

    if (migrantUserObject.family === undefined) {
      migrantUserObject.family = [];
    }

    return MigrantRepository.editMigrantUser(migrantUserId, migrantUserObject);
  },
};
