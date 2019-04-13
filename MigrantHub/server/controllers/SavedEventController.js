const SavedEventService = require('../service/SavedEventService');

module.exports = {

  async getSavedEvents(user, offset, limit) {
    return SavedEventService.getSavedEvents(user, offset, limit);
  },

  async addSavedEvent(user, eventId) {
    return SavedEventService.addSavedEvent(user, eventId);
  },

  async deleteSavedEvent(user, eventId) {
    return SavedEventService.deleteSavedEvent(user, eventId);
  },
};
