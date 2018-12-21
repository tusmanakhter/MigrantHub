const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const ReviewValidator = require('../validators/ReviewValidator');
const User = require('../models/User');
const ServicesService = require('../service/ServicesService');
const ReviewService = require('../models/ReviewService');

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

  async createService(user, serviceObject) {
    const parsedServiceObj = qs.parse(serviceObject);
    return ServicesService.createService(user, parsedServiceObj);
  },

  async getServices(editOwner, searchQuery, search) {
    return ServicesService.getServices(editOwner, searchQuery, search);
  },

  async getService(serviceId) {
    return ServicesService.getService(serviceId);
  },

  async updateService(user, serviceObject) {
    const parsedServiceObj = qs.parse(serviceObject);
    return ServicesService.updateService(user, parsedServiceObj);
  },

  async deleteService(user, serviceId) {
    const service = await ServicesService.getService(serviceId);

    if (user) {
      if (user.type === 'migrant' || user.type === 'business') {
        if (user._id !== service.email) {
          throw new Error('You can only delete this review if you are the author or an admin.');
        }
      } else if (user.type !== 'admin') {
        throw new Error('You can only delete this review if you are the author or an admin.');
      }
    } else {
      throw new Error('Please log out and log back in.');
    }

    return ServicesService.deleteService(serviceId);
  },

  async deleteReview(req, res) {
    // fetch the review in question
    const review = await ReviewService.findOne({ _id: req.params.id });

    // make sure the user has the right to delete the review
    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      // only author of the review or an admin can delete
      if (user.type === 'migrant') {
        if (req.user._id !== review.user) {
          return res.status(400).send('You can only delete this review if you are the author or an admin.');
        }
      } else if (user.type !== 'admin') {
        return res.status(400).send('You can only delete this review if you are the author or an admin.');
      }
    } else {
      return res.status(400).send('Please log out and log back in.');
    }
    ReviewService.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        return res.status(400).send(`There was an error deleting service: ${err}`);
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
        return res.send('There was an error getting service.');
      }
      return res.send(reviews);
    });
  },
};
