const qs = require('qs');
const BugService = require('../service/BugService');

module.exports = {

  async createBug(user, bugObject) {
    const parsedBugObj = qs.parse(bugObject);
    return BugService.createBug(user, parsedBugObj);
  },
};
