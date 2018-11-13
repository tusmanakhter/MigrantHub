const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const ServiceValidator = require('../validators/ServiceValidator');
const Services = require('../models/Services');

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(req.session);
    const path = `uploads/${req.session.passport.user._id}/services/`;
    fs.ensureDirSync(path);
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = {

  upload: multer({ storage: multerStorage }),

  createService(req, res) {
    const parsedObj = qs.parse(req.body.serviceDetails);
    const date = new Date();

    const errors = ServiceValidator(parsedObj);

    if (errors === '') {
      const services = new Services();
      services.email = req.user;
      services.serviceTitle = parsedObj.serviceTitle;
      services.serviceSummary = parsedObj.serviceSummary;
      services.serviceDescription = parsedObj.serviceDescription;
      services.serviceDate = parsedObj.serviceDate;
      services.location = parsedObj.location;
      services.serviceHours = parsedObj.serviceHours;
      if (parsedObj.serviceImageName === 'cameraDefault.png') {
          services.serviceImagePath = (`../default/${parsedObj.serviceImageName}`);
      } else {
          services.serviceImagePath = (`../${req.user._id}/services/${parsedObj.serviceImageName}`);
      }
      services.dateCreated = date;
      services.save((err) => {
        if (err) {
            logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                err.status, req.referer,'servicesController.createService' , err.message));
          return res.status(400).send('There was a error creating service.');
        }
        return res.status(200).send('Service has been created!');
      });
    } else {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            '500' , req.referer,'servicesController.createService: ServiceValidator' , errors));
        return res.status(400).send('There was a error creating service.');
      return res.status(400).send('There was a error creating service.');
    }
  },

  viewServices(req, res) {
    const query = {};

    if (req.query.editOwner !== '') {
      query.email = req.query.editOwner;
    }
    query.deleted = false;

    Services.find(query, (err, services) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'servicesController.viewServices' , err.message));
        return res.status(400).send('There was a error getting services.');
      }
      return res.status(200).send(services);
    });
  },

  getServiceData(req, res) {
    const query = {};

    if (req.query._id !== '') {
      query._id = req.query._id;
    }
    query.deleted = false;

    Services.findOne(query, (err, services) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'servicesController.getServiceData' , err.message));
        return res.status(400).send('There was a error getting services.');
      }
      return res.status(200).send(services);
    });
  },

  updateService(req, res) {
    let updateError = false;

    const parsedObj = qs.parse(req.body.serviceDetails);
    const errors = ServiceValidator(parsedObj);

    if (errors === '') {
      if (parsedObj.location === undefined) {
        parsedObj.location = {};
      }
      if (parsedObj.serviceDate === undefined) {
        parsedObj.serviceDate = {};
      }
      if (parsedObj.serviceHours === undefined) {
        parsedObj.serviceHours = [];
      }

      if ((parsedObj.serviceImagePath !== undefined) && (parsedObj.serviceImagePath !== (`../${req.user._id}/services/${parsedObj.serviceImageName}`))) {
        fs.remove(`uploads/${parsedObj.serviceImagePath.toString().substring(3)}`, (err) => {
          if (err) {
            logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                err.status, req.referer,'servicesController.updateService: removeImage' , err.message));
            updateError = true;
          }
        });
      }

      if (parsedObj.serviceImageName === 'cameraDefault.png') {
        parsedObj.serviceImagePath = (`../default/${parsedObj.serviceImageName}`);
      } else {
        parsedObj.serviceImagePath = (`../${req.user._id}/services/${parsedObj.serviceImageName}`);
      }

      Services.findByIdAndUpdate({ _id: parsedObj._id }, parsedObj, { new: true }, (err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'servicesController.updateService' , err.message));
          updateError = true;
        }
      });

      if (updateError) {
        return res.status(400).send('There was an error updating service.');
      }
      return res.status(200).send('Service updated successfully.');
    }
    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        '400', req.referer,'servicesController.updateService' , errors));
    return res.status(400).send('There was an error updating service.');
  },

  deleteService(req, res) {
    let deleteError = false;
    Services.updateOne({ _id: req.params.id },
      { deleted: true, deletedDate: Date.now() }, (err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'servicesController.deleteService' , err.message));
          deleteError = true;
        }
      });

    if (deleteError) {
      res.status(400).send('There was an error deleting service.');
    } else {
      res.status(200).send('Service deleted successfully.');
    }
  },
};
