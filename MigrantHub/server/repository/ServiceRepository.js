const Service = require('../models/Service');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  createService(serviceOwner, serviceObject) {
    const date = new Date();
    const service = new Service();

    service.user = serviceOwner;
    service.serviceTitle = serviceObject.serviceTitle;
    service.serviceSummary = serviceObject.serviceSummary;
    service.serviceDescription = serviceObject.serviceDescription;
    service.category = serviceObject.category;
    service.subcategory = serviceObject.subcategory;
    service.serviceDate = serviceObject.serviceDate;
    service.location = serviceObject.location;
    service.serviceHours = serviceObject.serviceHours;
    service.serviceImagePath = serviceObject.serviceImagePath;
    service.dateCreated = date;
    return service.save().then(() => Promise.resolve('Service has been created.')).catch((error) => {
      throw new ServerError('There was an error saving service.', 400, error);
    });
  },

  getServices(query) {
    return Service.find(query).exec().then(services => Promise.resolve(services)).catch((error) => {
      throw new ServerError('There was an error retrieving services.', 400, error);
    });
  },

  getService(query) {
    return Service.findOne(query).exec().then(service => Promise.resolve(service))
      .catch((error) => {
        throw new ServerError('There was an error retrieving service.', 400, error);
      });
  },

  updateService(serviceObject) {
    return Service.findByIdAndUpdate({ _id: serviceObject._id }, serviceObject,
      { new: true }).exec()
      .then(() => Promise.resolve('Service has been updated.')).catch((error) => {
        throw new ServerError('There was an error updating service in db.', 400, error);
      });
  },

  deleteService(serviceId) {
    return Service.updateOne({ _id: serviceId }, {
      deleted: true,
      deletedDate: Date.now(),
    }).exec().then(() => Promise.resolve('Service has been deleted.')).catch((error) => {
      throw new ServerError('There was an error deleting service.', 400, error);
    });
  },
};
