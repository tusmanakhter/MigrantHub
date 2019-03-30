const ExpressValidator = require('express-validator/check');
const JobRepository = require('../repository/JobRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createJob(user, parsedJobObject, validationObject) {
    const jobObject = parsedJobObject;
    const errors = ExpressValidator.validationResult(validationObject);
    if (errors.isEmpty()) {
      return JobRepository.createJob(user._id, jobObject);
    }
    throw new ServerError('There was an error creating job.', 400, errors);
  },

  async getJobs(offset, limit) {
    const query = {};

    query.deleted = false;
    return JobRepository.getJobs(query, offset, limit);
  },

  async getJob(jobId) {
    const query = {};
    query._id = jobId;
    query.deleted = false;

    return JobRepository.getJob(query);
  },
};
