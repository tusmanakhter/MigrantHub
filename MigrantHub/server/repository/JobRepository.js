const Job = require('../models/Job');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  createJob(jobOwner, jobObject) {
    const date = new Date();
    const job = new Job();
    job.user = jobOwner;
    job.title = jobObject.title;
    job.description = jobObject.description;
    job.positionType = jobObject.positionType;
    job.companyName = jobObject.companyName;
    job.contactName = jobObject.contactName;
    job.contactEmail = jobObject.contactEmail;
    job.contactPhone = jobObject.contactPhone;
    job.location = jobObject.location;
    job.salaryStart = jobObject.salaryStart;
    job.salaryEnd = jobObject.salaryEnd;
    job.numberOfHires = jobObject.numberOfHires;
    job.website = jobObject.website;
    job.dateCreated = date;

    return job.save().then(() => Promise.resolve('Job has been created.')).catch((error) => {
      throw new ServerError('There was an error creating job.', 400, error);
    });
  },

  getJobs(query, offset, limit) {
    if (offset !== undefined && limit !== undefined) {
      return Job.find(query).skip(parseInt(offset, 10)).limit(parseInt(limit, 10)).exec()
        .then(jobs => Promise.resolve(jobs))
        .catch((error) => {
          throw new ServerError('There was an error retrieving jobs.', 400, error);
        });
    }
    return Job.find(query, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).exec().then(jobs => Promise.resolve(jobs))
      .catch((error) => {
        throw new ServerError('There was an error retrieving jobs.', 400, error);
      });
  },

  getJob(query) {
    return Job.findOne(query).exec().then(job => Promise.resolve(job))
      .catch((error) => {
        throw new ServerError('There was an error retrieving job.', 400, error);
      });
  },
};
