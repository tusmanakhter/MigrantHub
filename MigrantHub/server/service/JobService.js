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

  async getJobs(owner, offset, limit) {
    const query = {};
    if (owner !== '') {
      query.user = owner;
    }

    query.deleted = false;
    return JobRepository.getJobs(query, offset, limit);
  },

  async getJob(jobId) {
    const query = {};
    query._id = jobId;
    query.deleted = false;

    return JobRepository.getJob(query);
  },

  async updateJob(parsedJobObject, validationObject) {
    const errors = ExpressValidator.validationResult(validationObject);
    if (errors.isEmpty()) {
      return JobRepository.updateJob(parsedJobObject);
    }
    throw new ServerError('There was an error updating job.', 400, errors);
  },

  async deleteJob(jobId) {
    return JobRepository.deleteJob(jobId);
  },
};
