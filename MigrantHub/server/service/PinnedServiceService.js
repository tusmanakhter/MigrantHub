const PinnedServiceRepository = require('../repository/PinnedServiceRepository');
const ServiceRepository = require('../repository/ServiceRepository');
module.exports = {

  async createPinnedService(userId) {
    return PinnedServiceRepository.createPinnedService(userId);
  },

  async updatePinnedService(userId, serviceId) {
    const pinnedService = await PinnedServiceRepository.getPinnedService(userId, serviceId, true);
    if (!pinnedService) {
      let query = { $push: { pinnedList: {serviceId: serviceId , deleted: false} }};
      return PinnedServiceRepository.updatePinnedService(userId, query);
    } else{
      return PinnedServiceRepository.updatePinnedServiceState(userId ,serviceId, false);
    }
  },

  async getPinnedService(userId, serviceId) {
    return PinnedServiceRepository.getPinnedService(userId ,serviceId, false);
  },

  async getPinnedServices(userId, offset, limit) {
    let query = { _id: userId };

    let pinnedServices = await PinnedServiceRepository.getPinnedServices(query, offset, limit);
    if(pinnedServices !== null){
      let listOfServices = pinnedServices[0].pinnedList;
      let pinnedServiceListQuery = [];
      for (var i = 0; i<listOfServices.length; i++){
          pinnedServiceListQuery.push({_id: listOfServices[i].serviceId});
        }
      query = {
        $or: pinnedServiceListQuery,
      };
      query.deleted = false;
      return ServiceRepository.getServices(query, undefined, undefined);
    }
    Promise.resolve([]);
  },

  async deletePinnedService(userId, serviceId) {
    return PinnedServiceRepository.updatePinnedServiceState(userId ,serviceId, true);
  },

};
