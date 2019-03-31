const qs = require('qs');
const SavedJobService = require('../service/SavedJobService');

module.exports = {

  async addSavedJob(user, jobId) {
    return SavedJobService.addSavedJob(user, jobId);
  },

  async deleteSavedJob(user, jobId) {
    return SavedJobService.deleteSavedJob(user, jobId);
  },
};
