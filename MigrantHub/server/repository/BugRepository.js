const Bug = require('../models/Bug');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  createBug(bugOwner, bugObject) {
    const bug = new Bug();
    bug.user = bugOwner;
    bug.bugName = bugObject.bugName;
    bug.description = bugObject.description;
    bug.dateCreated = bugObject.dateCreated;

    return bug.save().then(() => Promise.resolve('Bug has been created.')).catch((error) => {
      throw new ServerError('There was an error saving bug.', 400, error);
    });
  },
  getBugs() {
    return Bug.find().exec().then(bugs => Promise.resolve(bugs)).catch((error) => {
      throw new ServerError('There was an error retrieving bugs.', 400, error);
    });
  },
  getBug(query) {
    return Bug.findOne(query).exec().then(bugs => Promise.resolve(bugs)).catch((error) => {
      throw new ServerError('There was an error retrieving bug.', 400, error);
    });
  },
};
