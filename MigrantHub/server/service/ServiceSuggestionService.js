const stringSimilarity = require('string-similarity');
const ServiceSuggestionRepository = require('../repository/ServiceSuggestionRepository');
const ServiceRepository = require('../repository/ServiceRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  async createSuggestion(parsedServiceSuggestionObj) {
    let similarExists = false;
    const services = await ServiceRepository.getServices({ deleted: false });
    const serviceSuggestions = await ServiceSuggestionRepository.getSuggestions({ deleted: false });

    similarExists = services.find(service => stringSimilarity
      .compareTwoStrings(
        service.serviceDescription,
        parsedServiceSuggestionObj.serviceSummary
      ) > 0.9);

    if (!similarExists) {
      similarExists = serviceSuggestions.find(serviceSuggestion => stringSimilarity
        .compareTwoStrings(serviceSuggestion.serviceSummary,
          parsedServiceSuggestionObj.serviceSummary) > 0.9);
    }

    if (similarExists) {
      throw new ServerError('There was an error adding suggestion', 400, ['service or suggestion already exists']);
    }

    return ServiceSuggestionRepository
      .createSuggestion(parsedServiceSuggestionObj);
  },

  async getSuggestions() {
    return ServiceSuggestionRepository.getSuggestions({ deleted: false });
  },

  async deleteSuggestion(serviceSuggestionId) {
    return ServiceSuggestionRepository.deleteSuggestion(serviceSuggestionId);
  },
};
