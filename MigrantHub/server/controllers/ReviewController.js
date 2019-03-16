const qs = require('qs');
const ReviewService = require('../service/ReviewService');
const ServiceService = require('../service/ServiceService');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createReview(user, reviewObject) {
    const parsedReviewObject = qs.parse(reviewObject);
    parsedReviewObject.user = user._id;

    let retrievedService;
    let retrievedReview;

    // make sure the user isn't reviewing their own service
    await ServiceService.getService(parsedReviewObject.serviceId).then((service) => {
      retrievedService = service;
    }).catch((error) => {
      throw new ServerError('Server Errors. Please log out and back in and try again.', 400, error);
    });

    if (retrievedService.user === user._id) {
      throw new ServerError('You cannot review your own service.', 400, `Service id ${retrievedService.user} matches user's is ${user._id}`);
    }

    // make sure the user hasn't already reviewed this service
    await ReviewService.getReview(user, parsedReviewObject.serviceId).then((review) => {
      retrievedReview = review;
    }).catch((error) => {
      throw new ServerError('Server Errors. Please log out and back in and try again.', 400, error);
    });

    if (retrievedReview) {
      throw new ServerError('Your review for this service already exists.', 400, '');
    }

    return ReviewService.createReview(user, parsedReviewObject);
  },

  async getReviews(query) {
    return ReviewService.getReviews(query);
  },

  async getReview(user, serviceId) {
    return ReviewService.getReview(user, serviceId);
  },

  async deleteReview(reviewId) {
    return ReviewService.deleteReview(reviewId);
  },
};
