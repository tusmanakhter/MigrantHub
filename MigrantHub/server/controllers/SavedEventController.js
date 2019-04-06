const SavedEventService = require('../service/SavedEventService');

module.exports = {

  async addSavedEvent(user, eventId) {
    return SavedEventService.addSavedEvent(user, eventId);
  },

  async deleteSavedEvent(user, eventId) {
    return SavedEventService.deleteSavedEvent(user, eventId);
  },
};
