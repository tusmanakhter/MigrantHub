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
  async getBugs() {
    return BugRepository.getBugs();
  },
  async getBug(bugId) {
    const query = {};

    if (bugId !== '') {
      query._id = bugId;
    }

    return BugRepository.getBug(query);
  },
  async updateBug(bugId, parsedBugObject) {
    const bugObject = parsedBugObject;

    const errors = await BugValidator.bugValidator(bugObject);
    if (errors === '') {
      return BugRepository.updateBug(bugId, bugObject);
    }
    throw new ServerError('There was an error updating bug.', 400, errors);
  },
};
