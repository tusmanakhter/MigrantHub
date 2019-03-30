const qs = require('qs');
const JobService = require('../service/JobService');

module.exports = {

  async createJob(user, jobObject, validationObject) {
    const parsedJobObject = qs.parse(jobObject);
    return JobService.createJob(user, parsedJobObject, validationObject);
  },

  async getJobs(owner, offset, limit) {
    return JobService.getJobs(owner, offset, limit);
  },

  async getJob(jobId) {
    return JobService.getJob(jobId);
  },

  async updateJob(jobObject, validationObject) {
    const parsedJobObject = qs.parse(jobObject);
    return JobService.updateJob(parsedJobObject, validationObject);
  },

  async deleteJob(jobId) {
    return JobService.deleteJob(jobId);
  },
};
