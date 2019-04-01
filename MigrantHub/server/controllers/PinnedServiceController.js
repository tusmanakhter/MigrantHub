const PinnedServiceService = require('../service/PinnedServiceService');

module.exports = {

  async updatePinnedService(userId, serviceId) {
    return PinnedServiceService.updatePinnedService(userId, serviceId);
  },

  async getPinnedServices(serviceId, offset, limit) {
    return PinnedServiceService.getPinnedServices(serviceId, offset, limit);
  },

  async deletePinnedService(userId, serviceId) {
    return PinnedServiceService.deletePinnedService(userId, serviceId);
  },

};
