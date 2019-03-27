const BusinessRepository = require('../repository/BusinessRepository');
const BusinessAccountValidator = require('../validators/BusinessAccountValidator');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  async getBusinessUser(businessUserId) {
    return BusinessRepository.getBusinessUser(businessUserId);
  },

  async editBusinessUser(businessUserId, parsedBusinessUserObject) {
    const businessUserObject = parsedBusinessUserObject;
    const errors = await BusinessAccountValidator
      .businessAccountValidator(businessUserObject, true);
    if (errors === '') {
      return BusinessRepository.editBusinessUser(businessUserId, parsedBusinessUserObject);
    }
    throw new ServerError('There was an error updating profile.', 400, errors);
  },
};
