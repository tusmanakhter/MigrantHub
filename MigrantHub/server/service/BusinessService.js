const BusinessRepository = require('../repository/BusinessRepository');

module.exports = {

  async getBusinessUser(businessUserId) {
    return BusinessRepository.getBusinessUser(businessUserId);
  },

  async editBusinessUser(businessUserId, parsedBusinessUserObject) {
    return BusinessRepository.editBusinessUser(businessUserId, parsedBusinessUserObject);
  },
};
