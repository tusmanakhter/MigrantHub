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
      'savedList._id': jobId
    }, query)
      .exec().then(() => Promise.resolve('Saved job has been deleted.')).catch((error) => {
        throw new ServerError('There was an error deleting job.', 400, error);
      });
  },
};
