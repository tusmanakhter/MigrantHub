const Services = require('../models/Services');

module.exports = {

  createService(serviceOwner, serviceObject) {
    const date = new Date();
    const services = new Services();

    services.email = serviceOwner;
    services.serviceTitle = serviceObject.serviceTitle;
    services.serviceSummary = serviceObject.serviceSummary;
    services.serviceDescription = serviceObject.serviceDescription;
    services.serviceDate = serviceObject.serviceDate;
    services.location = serviceObject.location;
    services.serviceHours = serviceObject.serviceHours;
    services.serviceImagePath = serviceObject.serviceImagePath;
    services.dateCreated = date;

    services.save((err) => {
      if (err) {
        throw new Error('There was an error saving service.');
      } else {
        return Promise.resolve('Service has been created.');
      }
    });
  },

  findServices(query) {
    return Services.find(query).exec().then(services => Promise.resolve(services)).catch(() => {
      throw new Error('There was an error retrieving services.');
    });
  },

  findOneService(query) {
    return Services.findOne(query).exec().then(services => Promise.resolve(services)).catch(() => {
      throw new Error('There was an error retrieving service.');
    });
  },

  updateService(serviceObject) {
    return Services.findByIdAndUpdate({ _id: serviceObject._id }, serviceObject,
      { new: true }).exec()
      .then(() => Promise.resolve('Service has been updated.')).catch((error) => {
        throw new Error(`There was an error updating service in db.${error}`);
      });
  },

  deleteService(serviceId) {
    return Services.updateOne({ _id: serviceId }, {
      deleted: true,
      deletedDate: Date.now(),
    }).exec().then(() => Promise.resolve('Service has been deleted.')).catch(() => {
      throw new Error('There was an error deleting service.');
    });
  },
};
