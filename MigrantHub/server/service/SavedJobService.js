const SavedJobRepository = require('../repository/SavedJobRepository');
const JobRepository = require('../repository/JobRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createSavedJob(userId) {
    return SavedJobRepository.createSavedJob(userId);
  },

  async getSavedJobs(user, offset, limit) {
    let query = {};
    query._id = user._id;

    const savedJobs = await SavedJobRepository.getSavedJobs(query, offset, limit);
    if (savedJobs.length > 0) {
      const savedJobsList = [];
      for (let i = 0; i < savedJobs.length; i += 1) {
        savedJobsList.push({ _id: savedJobs[i]._id });
      }
      query = {
        $or: savedJobsList,
      };
      query.deleted = false;
      return JobRepository.getJobs(query, false, undefined, undefined);
    }
    return Promise.resolve([]);
  },

  async addSavedJob(user, jobId) {
    const foundSavedJob = await SavedJobRepository.getSavedJob(user._id, jobId);

    if (!foundSavedJob) {
      const query = {};
      query._id = jobId;
      query.deleted = false;

      return SavedJobRepository.addSavedJob(user._id, query);
    }
    const foundSavedJobState = foundSavedJob.savedList.filter(item => item._id === String(jobId));

    if (foundSavedJobState[0].deleted === true) {
      const query = { $set: { 'savedList.$.deleted': false, 'savedList.$.deletedDate': null } };
      return SavedJobRepository.updateSavedJob(user._id, jobId, query);
    }
    throw new ServerError('Saved Job already exists.', 400, '');
  },

  async deleteSavedJob(user, jobId) {
    const query = { $set: { 'savedList.$.deleted': true, 'savedList.$.deletedDate': Date.now() } };
    return SavedJobRepository.updateSavedJob(user._id, jobId, query);
  },
};
