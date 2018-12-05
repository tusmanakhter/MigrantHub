const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const ServiceValidator = require('../validators/ServiceValidator');
const ReviewValidator = require('../validators/ReviewValidator');
const User = require('../models/User');
const Services = require('../models/Services');
const ReviewService = require('../models/ReviewService');
const { logger, formatMessage } = require('../config/winston');

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
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
        services.serviceImagePath = (`../uploads/default/${parsedObj.serviceImageName}`);
      } else {
        services.serviceImagePath = (`../uploads/${req.user._id}/services/${parsedObj.serviceImageName}`);
      }
      services.dateCreated = date;
      services.save((err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer, 'servicesController.createService', err.message));
          return res.status(400).send('There was an error creating service.');
        }
        return res.status(200).send('Service has been created!');
      });
    } else {
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        '500', req.referer, 'servicesController.createService: ServiceValidator', errors));
      return res.status(400).send('There was an error creating service.');
    }
  },

  viewServices(req, res) {
    const { editOwner, searchQuery, search } = req.query;
    let query = {};

    if (editOwner !== '') {
      query.email = editOwner;
    } else if (search !== '') {
      const tempSearchQuery = searchQuery;
      const regex = new RegExp(tempSearchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
      query = { $or: [{ serviceTitle: regex }, { serviceSummary: regex }] };
    }

    query.deleted = false;

    Services.find(query, (err, services) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'servicesController.viewServices', err.message));
        return res.status(400).send('There was an error getting services.');
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
          err.status, req.referer, 'servicesController.getServiceData', err.message));
        return res.status(400).send('There was an error getting services.');
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

      if ((parsedObj.serviceImagePath !== undefined) && (parsedObj.serviceImagePath !== (`../uploads/${req.user._id}/services/${parsedObj.serviceImageName}`))) {
        fs.remove(`${parsedObj.serviceImagePath.toString().substring(3)}`, (err) => {
          if (err) {
            logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer, 'servicesController.updateService: removeImage', err.message));
            updateError = true;
          }
        });
      }

      if (parsedObj.serviceImageName === 'cameraDefault.png') {
        parsedObj.serviceImagePath = (`../uploads/default/${parsedObj.serviceImageName}`);
      } else {
        parsedObj.serviceImagePath = (`../uploads/${req.user._id}/services/${parsedObj.serviceImageName}`);
      }

      Services.findByIdAndUpdate({ _id: parsedObj._id }, parsedObj, { new: true }, (err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer, 'servicesController.updateService', err.message));
          updateError = true;
        }
      });

      if (updateError) {
        return res.status(400).send('There was an error updating service.');
      }
      return res.status(200).send('Service updated successfully.');
    }
    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
      '400', req.referer, 'servicesController.updateService', errors));
    return res.status(400).send('There was an error updating service.');
  },

  deleteService(req, res) {
    let deleteError = false;
    Services.updateOne({ _id: req.params.id },
      { deleted: true, deletedDate: Date.now() }, (err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer, 'servicesController.deleteService', err.message));
          deleteError = true;
        }
      });

    if (deleteError) {
      res.status(400).send('There was an error deleting service.');
    } else {
      res.status(200).send('Service deleted successfully.');
    }
  },

  async deleteReview(req, res) {
    //fetch the review in question
    const review = await ReviewService.findOne({_id: req.params.id});

    //make sure the user has the right to delete the review
    const user = await User.findOne({_id: req.user._id,});
    if (user) {
      //only author of the review or an admin can delete
      if (user.type === 'migrant') {
        if (req.user._id !== review.user) {
          return res.status(400). send('You can only delete this review if you are the author or an admin.')
        }
      } else if (user.type !== 'admin') {
        return res.status(400). send('You can only delete this review if you are the author or an admin.')
      }
    } else {
      return res.status(400). send('Please log out and log back in.')
    }
    ReviewService.deleteOne({ _id: req.params.id }, function(err) {
      if (err) {
        return res.status(400).send('There was an error deleting service: ' + e);
      }
      return res.status(200).send('Service deleted successfully.');
    });
  },

  async createServiceReview(req, res) {
    const parsedObj = qs.parse(req.body);
    parsedObj.user = req.user._id;

    const errors = await ReviewValidator(parsedObj);

    if (errors === '') {
      const reviewService = new ReviewService();
      reviewService.user = req.user;
      reviewService.serviceId = parsedObj.serviceId;
      reviewService.rating = parsedObj.rating;
      reviewService.comment = parsedObj.comment;
      reviewService.save((err) => {
        if (err) {
          return res.send({ addReviewMessage: `There was an error creating the review.${err}`, addReviewError: true });
        }
        return res.send({ addReviewMessage: 'Review has been created!', addReviewError: false });
      });
    } else {
      return res.send({ addReviewMessage: errors, addReviewError: true });
    }
  },

  async getServiceReviews(req, res) {
    ReviewService.find(req.query, (err, reviews) => {
      if (err) {
        return res.send('There was an error getting services.');
      }
      return res.send(reviews);
    });
  },
};
