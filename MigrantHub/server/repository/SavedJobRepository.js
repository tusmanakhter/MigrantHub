const SavedJob = require('../models/SavedJob');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  createSavedJob(jobOwner) {
    const savedJob = new SavedJob();
    savedJob._id = jobOwner;

    return savedJob.save().then(() => Promise.resolve('Saved job has been created.')).catch((error) => {
      throw new ServerError('There was an error creating saved job.', 400, error);
    });
  },

  getSavedJobs(query, offset, limit) {
    if (offset !== undefined && limit !== undefined) {
      return SavedJob.aggregate([
        { $match: query },
        { $unwind: '$savedList' },
        { $replaceRoot: { newRoot: '$savedList' } },
        { $match: { deleted: false } },
      ]).skip(parseInt(offset, 10)).limit(parseInt(limit, 10)).exec()
        .then(savedJobs => Promise.resolve(savedJobs))
        .catch((error) => {
          throw new ServerError('There was an error retrieving saved jobs.', 400, error);
        });
    }
    return SavedJob.findOne(query).exec().then(jobs => Promise.resolve(jobs))
      .catch((error) => {
        throw new ServerError('There was an error retrieving saved jobs.', 400, error);
      });
  },

  getSavedJob(userId, jobId) {
    return SavedJob.findOne({
      _id: userId,
      'savedList._id': jobId,
    }).exec().then(savedJob => Promise.resolve(savedJob))
      .catch((error) => {
        throw new ServerError('There was an error retrieving saved job.', 400, error);
      });
  },

  addSavedJob(userId, savedData) {
    return SavedJob.update({ _id: userId }, { $push: { savedList: savedData } },
      { new: true }).exec()
      .then(() => Promise.resolve('Saved job has been added.')).catch((error) => {
        throw new ServerError('There was an error saving job in db.', 400, error);
      });
  },

  updateSavedJob(userId, jobId, query) {
    return SavedJob.update({
      _id: userId,
      'savedList._id': jobId,
    }, query)
      .exec().then(() => Promise.resolve('Saved job has been updated.')).catch((error) => {
        throw new ServerError('There was an error updating saved job.', 400, error);
      });
  },
};
