const qs = require('qs');
const ReviewValidator = require('../validators/ReviewValidator');
const Review = require('../models/Review');
const { logger, formatMessage } = require('../config/winston');

module.exports = {
  async getReviews(req, res) {
    Review.find(req.query, (err, reviews) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'ReviewController.getReviews', err.message));
        return res.send('There was an error getting reviews.');
      }
      return res.send(reviews);
    });
  },

  async createReview(req, res) {
    const parsedObj = qs.parse(req.body);
    parsedObj.user = req.user._id;

    const errors = await ReviewValidator(parsedObj);

    if (errors === '') {
      const review = new Review();
      review.user = req.user;
      review.serviceId = parsedObj.serviceId;
      review.rating = parsedObj.rating;
      review.comment = parsedObj.comment;
      review.save((err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer, 'ReviewController.createReview', err.message));
          return res.send({ addReviewMessage: `There was an error creating the review.${err}`, addReviewError: true });
        }
        return res.send({ addReviewMessage: 'Review has been created!', addReviewError: false });
      });
    } else {
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        '500', req.referer, 'ReviewController.createReview: ReviewValidator', errors));
      return res.send({ addReviewMessage: errors, addReviewError: true });
    }
  },

  deleteReview(req, res) {
    Review.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'ReviewController.deleteReview', err.message));
        return res.status(400).send(`There was an error deleting review: ${err}`);
      }
      return res.status(200).send('Review deleted successfully.');
    });
  },
};
