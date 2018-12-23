const Service = require('../models/Service');

module.exports = {

  createService(serviceOwner, serviceObject) {
    const date = new Date();
    const service = new Service();

    service.user = serviceOwner;
    service.serviceTitle = serviceObject.serviceTitle;
    service.serviceSummary = serviceObject.serviceSummary;
    service.serviceDescription = serviceObject.serviceDescription;
    service.serviceDate = serviceObject.serviceDate;
    service.location = serviceObject.location;
    service.serviceHours = serviceObject.serviceHours;
    service.serviceImagePath = serviceObject.serviceImagePath;
    service.dateCreated = date;
    return service.save().then(() => Promise.resolve('Service has been created.')).catch(() => {
      throw new Error('There was an error saving service.');
    });
  },

  getServices(query) {
    return Service.find(query).exec().then(services => Promise.resolve(services)).catch(() => {
      throw new Error('There was an error retrieving services.');
    });
  },

  getService(query) {
    return Service.findOne(query).exec().then(service => Promise.resolve(service)).catch(() => {
      throw new Error('There was an error retrieving service.');
    });
  },

  updateService(serviceObject) {
    return Service.findByIdAndUpdate({ _id: serviceObject._id }, serviceObject,
      { new: true }).exec()
      .then(() => Promise.resolve('Service has been updated.')).catch((error) => {
        throw new Error(`There was an error updating service in db.${error}`);
      });
  },

  deleteService(serviceId) {
    return Service.updateOne({ _id: serviceId }, {
      deleted: true,
      deletedDate: Date.now(),
    }).exec().then(() => Promise.resolve('Service has been deleted.')).catch(() => {
      throw new Error('There was an error deleting service.');
    });
  },
};
