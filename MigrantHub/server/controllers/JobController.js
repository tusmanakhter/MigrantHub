const qs = require('qs');
const JobService = require('../service/JobService');

module.exports = {

  async createJob(user, jobObject, validationObject) {
    const parsedJobObject = qs.parse(jobObject);
    return JobService.createJob(user, parsedJobObject, validationObject);
  },

  async getJobs(user, owner, offset, limit) {
    return JobService.getJobs(user, owner, offset, limit);
  },

  async getJob(user, jobId) {
    return JobService.getJob(user, jobId);
  },

  async updateJob(jobObject, validationObject) {
    const parsedJobObject = qs.parse(jobObject);
    return JobService.updateJob(parsedJobObject, validationObject);
  },

  async deleteJob(jobId) {
    return JobService.deleteJob(jobId);
  },
};
