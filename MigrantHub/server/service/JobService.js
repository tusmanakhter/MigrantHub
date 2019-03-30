const JobRepository = require('../repository/JobRepository');
const { ServerError } = require('../errors/ServerError');
const ExpressValidator = require('express-validator/check');

module.exports = {

  async createJob(user, parsedJobObject, validationObject) {
    const jobObject = parsedJobObject;
    const errors = ExpressValidator.validationResult(validationObject);

    if (errors.isEmpty()) {
      console.log(jobObject);
      return JobRepository.createJob(user._id, jobObject);
    }
    throw new ServerError('There was an error creating job.', 400, errors);
  },

  async getJobs(offset, limit) {
    let query = {};

    query.deleted = false;
    console.log(query);
    console.log("here");
    return JobRepository.getJobs(query, offset, limit);
  },

  async getJob(jobId) {
    const query = {};
    query._id = jobId;
    query.deleted = false;

    return JobRepository.getJob(query);
  },
};
