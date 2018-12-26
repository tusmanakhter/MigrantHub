const qs = require('qs');
const BusinessUserService = require('../service/BusinessService');

module.exports = {
  async getBusinessUser(businessUserId) {
    return BusinessUserService.getBusinessUser(businessUserId);
  },

  async editBusinessUser(businessUserId, businessUserObject) {
    const parsedBusinessUserObject = qs.parse(businessUserObject);
    return BusinessUserService.editBusinessUser(businessUserId, parsedBusinessUserObject);
  },
};
