const ServiceSuggestion = require('../models/ServiceSuggestion');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  createSuggestion(serviceSuggestionObj) {
    const serviceSuggestion = new ServiceSuggestion();

    serviceSuggestion.serviceTitle = serviceSuggestionObj.serviceTitle;
    serviceSuggestion.serviceSummary = serviceSuggestionObj.serviceSummary;
    serviceSuggestion.category = serviceSuggestionObj.category;
    serviceSuggestion.subcategory = serviceSuggestionObj.subcategory;
    return serviceSuggestion.save().then(() => Promise.resolve('Service suggestion has been created.')).catch((error) => {
      throw new ServerError('There was an error saving service suggestion.', 400, error);
    });
  },

  getSuggestions(query) {
    return ServiceSuggestion.find(query).exec()
      .then(serviceSuggestions => Promise.resolve(serviceSuggestions)).catch((error) => {
        throw new ServerError('There was an error retrieving service suggestions.', 400, error);
      });
  },

  deleteSuggestion(serviceSuggestionId) {
    return ServiceSuggestion.updateOne({ _id: serviceSuggestionId }, {
      deleted: true,
      deletedDate: Date.now(),
    }).exec().then(() => Promise.resolve('Service suggestion has been deleted.')).catch((error) => {
      throw new ServerError('There was an error deleting service suggestion', 400, error);
    });
  },
};
