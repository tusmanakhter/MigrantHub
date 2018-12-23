const BusinessUserRepository = require('../repository/BusinessUserRepository');

module.exports = {

    async getBusinessUser(businessUserId) {
        return BusinessUserRepository.getBusinessUser(businessUserId);
    },

    async editBusinessUser(businessUserId, parsedBusinessUserObject) {
        return BusinessUserRepository.editBusinessUser(businessUserId, parsedBusinessUserObject);
    },
};
