const BugValidator = require('../validators/BugValidator');
const BugRepository = require('../repository/BugRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createBug(user, parsedBugObject) {
    const bugObject = parsedBugObject;
    const date = new Date();
    const errors = await BugValidator.bugValidator(bugObject);

    if (errors === '') {
      bugObject.dateCreated = date;
      return BugRepository.createBug(user._id, bugObject);
    }
    throw new ServerError('There was an error creating the bug.', 400, errors);
  },
};
