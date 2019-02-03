const fs = require('fs-extra');
const axios = require('axios');
const ServiceValidator = require('../validators/ServiceValidator');
const ServiceRepository = require('../repository/ServiceRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createService(user, parsedServiceObj) {
    const serviceObject = parsedServiceObj;
    const errors = await ServiceValidator.serviceValidator(serviceObject);

    if (errors === '') {
      if (serviceObject.serviceImageName === 'montrealCity.png') {
        serviceObject.serviceImagePath = (`/uploads/default/${serviceObject.serviceImageName}`);
      } else {
        serviceObject.serviceImagePath = (`/uploads/${user._id}/services/${serviceObject.serviceImageName}`);
      }
      return ServiceRepository.createService(user._id, serviceObject);
    }
    throw new ServerError('There was an error creating service.', 400, errors);
  },

  async getServices(userId, searchQuery, search, category, subcategory, locale) {
    let query = {};
    console.log(`logging locale for eslint ${locale}`);
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

      if (serviceObject.serviceImageName === 'montrealCity.png') {
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

  async getRecommendations(user) {
    let query = {};

    const recommendedIds = await axios.get(`http://35.203.89.239:8080/api/recommendation/${user._id}`)
      .then(response => response.data)
      .catch((error) => {
        throw new ServerError('There was an error retrieving recommended services.', 400, error);
      });

    const result = recommendedIds.match(/[A-Za-z_0-9]{5,}/g);

    query = { $or: [{ _id: result[0] }, { _id: result[1] }, { _id: result[2] }] };
    query.deleted = false;

    return ServiceRepository.getServices(query);
  },


};
