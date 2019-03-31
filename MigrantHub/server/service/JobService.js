const ExpressValidator = require('express-validator/check');
const JobRepository = require('../repository/JobRepository');
const SavedJobRepository = require('../repository/SavedJobRepository');
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

  async getJobs(user, owner, offset, limit) {
    const query = {};
    if (owner !== '') {
      query.user = owner;
    }
    query.deleted = false;

    let jobs = await JobRepository.getJobs(query, offset, limit);
    jobs = await jobs.map(async (job) => {
      const foundJob = job.toObject();
      let foundSavedJob = await SavedJobRepository.getSavedJob(user._id, job._id);

      if(!foundSavedJob){
        foundJob.savedJob = false;
      }else{
        const foundSavedJobState = foundSavedJob.savedList.filter(item => item._id === String(job._id));
        if(foundSavedJobState[0].deleted == true){
          foundJob.savedJob = false;
        }else{
          foundJob.savedJob = true;
        }
      }
        return foundJob;
    });
    return Promise.all(jobs);

  },

  async getJob(user, jobId) {
    const query = {};
    query._id = jobId;
    query.deleted = false;

    let job = await JobRepository.getJob(query);
    const foundJob = job.toObject();
    let foundSavedJob = await SavedJobRepository.getSavedJob(user._id, job._id);

    if(!foundSavedJob){
      foundJob.savedJob = false;
    }else{
      const foundSavedJobState = foundSavedJob.savedList.filter(item => item._id === String(job._id));
      if(foundSavedJobState[0].deleted == true){
        foundJob.savedJob = false;
      }else{
        foundJob.savedJob = true;
      }
    }
    return Promise.resolve(foundJob);
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
