const ReviewValidator = require('../validators/ReviewValidator');
const ReviewRepository = require('../repository/ReviewRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createReview(user, parsedReviewObject) {
    const reviewObject = parsedReviewObject;
    const errors = await ReviewValidator.reviewValidator(reviewObject);
    if (errors === '') {
      reviewObject.firstName = user.firstName;
      reviewObject.lastName = user.lastName;
      return ReviewRepository.createReview(user._id, reviewObject);
    }
    throw new ServerError('There was an error creating the review.', 400, errors);
  },

  async getReview(user, serviceId) {
    const query = {};
    query.user = user._id;
    query.serviceId = serviceId;
    query.deleted = false;
    return ReviewRepository.getReview(query);
  },

  async reviewExists(user, serviceId) {
    const review = await this.getReview(user, serviceId);
    console.log(review);
    if (review != null) {
      return Promise.resolve('Review Exists.');
    }
    throw new ServerError('Review does not exist.', 400, '');
  },

  async getReviews(query) {
    const passedQuery = query;
    passedQuery.deleted = false;
    return ReviewRepository.getReviews(passedQuery);
  },

  async deleteReview(reviewId) {
    return ReviewRepository.deleteReview(reviewId);
  },
};
