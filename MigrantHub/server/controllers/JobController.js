const qs = require('qs');
const JobService = require('../service/JobService');

module.exports = {

  async createJob(user, jobObject, validationObject) {
    const parsedJobObject = qs.parse(jobObject);
    return JobService.createJob(user, parsedJobObject, validationObject);
  },

  async getJobs(offset, limit) {
    return JobService.getJobs(offset, limit);
  },
};
