const SavedEventRepository = require('../repository/SavedEventRepository');
const EventRepository = require('../repository/EventRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createSavedEvent(userId) {
    return SavedEventRepository.createSavedEvent(userId);
  },

  async getSavedEvents(user, offset, limit) {
    let query = {};
    query._id = user._id;

    const savedEvents = await SavedEventRepository.getSavedEvents(query, offset, limit);
    if (savedEvents.length > 0) {
      const savedEventsList = [];
      for (let i = 0; i < savedEvents.length; i += 1) {
        savedEventsList.push({ _id: savedEvents[i]._id });
      }
      query = {
        $or: savedEventsList,
      };
      query.deleted = false;
      return EventRepository.getEvents(query, false, undefined, undefined);
    }
    return Promise.resolve([]);
  },

  async addSavedEvent(user, eventId) {
    const foundSavedEvent = await SavedEventRepository.getSavedEvent(user._id, eventId);

    if (!foundSavedEvent) {
      const query = {};
      query._id = eventId;
      query.deleted = false;

      return SavedEventRepository.addSavedEvent(user._id, query);
    }
    const foundSavedEventState = foundSavedEvent.savedList.filter(
      item => item._id === String(eventId),
    );

    if (foundSavedEventState[0].deleted === true) {
      const query = { $set: { 'savedList.$.deleted': false, 'savedList.$.deletedDate': null } };
      return SavedEventRepository.updateSavedEvent(user._id, eventId, query);
    }
    throw new ServerError('Saved Event already exists.', 400, '');
  },

  async deleteSavedEvent(user, eventId) {
    const query = { $set: { 'savedList.$.deleted': true, 'savedList.$.deletedDate': Date.now() } };
    return SavedEventRepository.updateSavedEvent(user._id, eventId, query);
  },
};
