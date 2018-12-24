const qs = require('qs');
const ReviewService = require('../service/ReviewService');
const ServicesService = require('../service/ServicesService');

module.exports = {

  async createReview(user, reviewObject) {
    const parsedReviewObject = qs.parse(reviewObject);
    parsedReviewObject.user = user._id;

    let retrievedService;
    let retrievedReview;

    // make sure the user isn't reviewing their own service
    await ServicesService.getService(parsedReviewObject.serviceId).then((service) => {
      retrievedService = service;
    }).catch(() => {
      throw new Error('Server Errors. Please log out and back in and try again.');
    });

    if (retrievedService.user === user._id) {
      throw new Error('You cannot review your own service.');
    }

    // make sure the user hasn't already reviewed this service
    await ReviewService.getReview(user, parsedReviewObject.serviceId).then((review) => {
      retrievedReview = review;
    }).catch(() => {
      throw new Error('Server Errors. Please log out and back in and try again.');
    });

    if (retrievedReview) {
      throw new Error('Your review for this service already exists.');
    }

    return ReviewService.createReview(user, parsedReviewObject);
  },

  async getReviews(query) {
    return ReviewService.getReviews(query);
  },

  async deleteReview(reviewId) {
    return ReviewService.deleteReview(reviewId);
  },
};
