const fs = require('fs-extra');
const ServiceValidator = require('../validators/ServiceValidator');
const ServiceRepository = require('../repository/ServiceRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createService(user, parsedServiceObj) {
    const serviceObject = parsedServiceObj;
    const errors = await ServiceValidator.serviceValidator(serviceObject);

    if (errors === '') {
      if (serviceObject.serviceImageName === 'cameraDefault.png') {
        serviceObject.serviceImagePath = (`/uploads/default/${serviceObject.serviceImageName}`);
      } else {
        serviceObject.serviceImagePath = (`/uploads/${user._id}/services/${serviceObject.serviceImageName}`);
      }
      return ServiceRepository.createService(user._id, serviceObject);
    }
    throw new ServerError('There was an error creating service.', 400, errors);
  },

  async getServices(userId, searchQuery, search, category, subcategory) {
    let query = {};

    if (userId !== '') {
      query.user = userId;
    } else if (search === 'true') {
      const tempSearchQuery = searchQuery;
      const regex = new RegExp(tempSearchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
      query = { $or: [{ serviceTitle: regex }, { serviceSummary: regex }] };
    } else if (category !== '') {
      query = { category, subcategory };
    }

    query.deleted = false;
    return ServiceRepository.getServices(query);
  },

  async getService(serviceId) {
    const query = {};

    if (serviceId !== '') {
      query._id = serviceId;
    }
    query.deleted = false;

    return ServiceRepository.getService(query);
  },

  async updateService(user, parsedServiceObj) {
    const serviceObject = parsedServiceObj;
    const errors = await ServiceValidator.serviceValidator(serviceObject);

    if (errors === '') {
      if (serviceObject.location === undefined) {
        serviceObject.location = {};
      }
      if (serviceObject.serviceDate === undefined) {
        serviceObject.serviceDate = {};
      }
      if (serviceObject.serviceHours === undefined) {
        serviceObject.serviceHours = [];
      }

      if ((serviceObject.serviceImagePath !== undefined) && (serviceObject.serviceImagePath !== (`/uploads/${user._id}/services/${serviceObject.serviceImageName}`))) {
        fs.remove(`${serviceObject.serviceImagePath.toString().substring(3)}`, (error) => {
          if (error) {
            throw new ServerError('serviceController.updateService: removeImage', 400, error);
          }
        });
      }

      if (serviceObject.serviceImageName === 'cameraDefault.png') {
        serviceObject.serviceImagePath = (`/uploads/default/${serviceObject.serviceImageName}`);
      } else {
        serviceObject.serviceImagePath = (`/uploads/${user._id}/services/${serviceObject.serviceImageName}`);
      }

      return ServiceRepository.updateService(serviceObject);
    }
    throw new ServerError('There was an error updating service.', 400, errors);
  },

  async deleteService(serviceId) {
    return ServiceRepository.deleteService(serviceId);
  },
};
