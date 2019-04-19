const qs = require('qs');
const BugService = require('../service/BugService');

module.exports = {

  async createBug(user, bugObject) {
    const parsedBugObj = qs.parse(bugObject);
    return BugService.createBug(user, parsedBugObj);
  },
  async getBugs() {
    return BugService.getBugs();
  },
  async getBug(bugId) {
    return BugService.getBug(bugId);
  },
  async updateBug(bugId, bugObject) {
    const parsedBugObject = qs.parse(bugObject);
    return BugService.updateBug(bugId, parsedBugObject);
  },

};
