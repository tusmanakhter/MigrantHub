const PinnedServiceRepository = require('../repository/PinnedServiceRepository');
const ServiceRepository = require('../repository/ServiceRepository');
const ReviewRepository = require('../repository/ReviewRepository');

module.exports = {

  async createPinnedService(userId) {
    return PinnedServiceRepository.createPinnedService(userId);
  },

  async updatePinnedService(userId, serviceId) {
    const pinnedService = await PinnedServiceRepository.getPinnedService(userId, serviceId, true);
    if (!pinnedService) {
      const query = { $push: { pinnedList: { serviceId, deleted: false } } };
      return PinnedServiceRepository.updatePinnedService(userId, query);
    }
    return PinnedServiceRepository.updatePinnedServiceState(userId, serviceId, false);
  },

  async getPinnedService(userId, serviceId) {
    return PinnedServiceRepository.getPinnedService(userId, serviceId, false);
  },

  async getPinnedServices(userId, offset, limit) {
    let query = { _id: userId };

    const pinnedServices = await PinnedServiceRepository.getPinnedServices(query, offset, limit);
    if (pinnedServices.length > 0) {
      const listOfServices = pinnedServices;
      const pinnedServiceListQuery = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < listOfServices.length; i++) {
        pinnedServiceListQuery.push({ _id: listOfServices[i].serviceId });
      }
      query = {
        $or: pinnedServiceListQuery,
      };
      query.deleted = false;
      let services = await ServiceRepository.getServices(query, undefined, undefined);
      services = await services.map(async (service) => {
        const updatedService = service.toObject();
        const avg = await ReviewRepository.getAverageRating(service._id.toString());
        let average = 0;
        let count = 0;
        if (avg[0] !== undefined) {
          average = avg[0].avgRating;
          count = avg[0].countRating;
        }
        updatedService.avgRating = average;
        updatedService.countRating = count;
        return updatedService;
      });
      return Promise.all(services);
	    }
	    else {
        return Promise.resolve([]);
      }
  },

  async deletePinnedService(userId, serviceId) {
    return PinnedServiceRepository.updatePinnedServiceState(userId, serviceId, true);
  },

};
