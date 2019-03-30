const JobRepository = require('../repository/JobRepository');
const { ServerError } = require('../errors/ServerError');
const ExpressValidator = require('express-validator/check');

module.exports = {

  async createJob(user, parsedJobObject, validationObject) {
    console.log("Here at service");
    const jobObject = parsedJobObject;
    const errors = ExpressValidator.validationResult(validationObject);

    if (errors.isEmpty()) {
      console.log(jobObject);
      return JobRepository.createJob(user._id, jobObject);
    }
    console.log(errors.array());
    throw new ServerError('There was an error creating job.', 400, errors);
  },
};
