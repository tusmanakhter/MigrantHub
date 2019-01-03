const qs = require('qs');
const ServiceSuggestionService = require('../service/ServiceSuggestionService');

module.exports = {
  async createSuggestion(serviceSuggestion) {
    const parsedServiceSuggestionObj = qs.parse(serviceSuggestion);
    return ServiceSuggestionService.createSuggestion(parsedServiceSuggestionObj);
  },

  async getSuggestions() {
    return ServiceSuggestionService.getSuggestions();
  },

  async deleteSuggestion(serviceSuggestionId) {
    return ServiceSuggestionService.deleteSuggestion(serviceSuggestionId);
  },
};
