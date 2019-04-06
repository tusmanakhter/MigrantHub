const SavedEvent = require('../models/SavedEvent');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  createSavedEvent(eventOwner) {
    const savedEvent = new SavedEvent();
    savedEvent._id = eventOwner;

    return savedEvent.save().then(() => Promise.resolve('Saved event has been created.')).catch((error) => {
      throw new ServerError('There was an error creating saved event.', 400, error);
    });
  },

  getSavedEvent(userId, eventId) {
    return SavedEvent.findOne({
      _id: userId,
      'savedList._id': eventId,
    }).exec().then(savedEvent => Promise.resolve(savedEvent))
      .catch((error) => {
        throw new ServerError('There was an error retrieving saved event.', 400, error);
      });
  },

  addSavedEvent(userId, savedData) {
    return SavedEvent.update({ _id: userId }, { $push: { savedList: savedData } },
      { new: true }).exec()
      .then(() => Promise.resolve('Saved event has been added.')).catch((error) => {
        throw new ServerError('There was an error saving event in db.', 400, error);
      });
  },

  updateSavedEvent(userId, eventId, query) {
    return SavedEvent.update({
      _id: userId,
      'savedList._id': eventId,
    }, query)
      .exec().then(() => Promise.resolve('Saved event has been updated.')).catch((error) => {
        throw new ServerError('There was an error updating saved event.', 400, error);
      });
  },
};
