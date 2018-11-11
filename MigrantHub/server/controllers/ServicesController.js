const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const ServiceValidator = require('../validators/ServiceValidator');
const Services = require('../models/Services');
const ReviewService = require('../models/ReviewService');

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
          return res.status(400).send('There was a error creating service.');
        }
        return res.status(200).send('Service has been created!');
      });
    } else {
      return res.status(400).send('There was a error creating service.');
    }
  },

  viewServices(req, res) {
    const query = {};

    if (req.query.editOwner !== '') {
      query.email = req.query.editOwner;
    }
    Services.find(query, (err, services) => {
      if (err) {
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

    Services.findOne(query, (err, services) => {
      if (err) {
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
          updateError = true;
        }
      });

      if (updateError) {
        return res.status(400).send('There was an error updating service.');
      }
      return res.status(200).send('Service updated successfully.');
    }
    return res.status(400).send('There was an error updating service.');
  },

  createServiceReview(req, res) {
    const parsedObj = qs.parse(req.body);
    console.log('serviceId: ' + parsedObj.serviceId);
    console.log('rating: ' + parsedObj.rating);
    console.log('comment: ' + parsedObj.comment);
    // const date = new Date();

    //TODO validation
    // const errors = ServiceValidator(parsedObj);

    // if (errors === '') {
      const reviewService = new ReviewService();
      reviewService.user = req.user;
      reviewService.serviceId = parsedObj.serviceId;
      reviewService.rating = parsedObj.rating;
      reviewService.comment = parsedObj.comment;
      reviewService.save((err) => {
        if (err) {
          return res.status(400).send('There was a error creating the review.');
        }
        return res.status(200).send('Service has been created!');
      });
    // } else {
    //   return res.status(400).send('There was a error creating service.');
    // }
  },
};
