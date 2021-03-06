const SavedJobService = require('../service/SavedJobService');

module.exports = {

  async getSavedJobs(user, offset, limit) {
    return SavedJobService.getSavedJobs(user, offset, limit);
  },

  async addSavedJob(user, jobId) {
    return SavedJobService.addSavedJob(user, jobId);
  },

  async deleteSavedJob(user, jobId) {
    return SavedJobService.deleteSavedJob(user, jobId);
  },
};
