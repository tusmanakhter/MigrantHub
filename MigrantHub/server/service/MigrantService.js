const MigrantRepository = require('../repository/MigrantRepository');
const MigrantAccountValidator = require('../validators/MigrantAccountValidator');
const { ServerError } = require('../errors/ServerError');

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

    const errors = await MigrantAccountValidator.migrantAccountValidator(migrantUserObject, true);
    if (errors === '') {
      return MigrantRepository.editMigrantUser(migrantUserId, migrantUserObject);
    }
    throw new ServerError('There was an error updating profile.', 400, errors);
  },
};
