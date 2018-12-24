const ReviewValidator = require('../validators/ReviewValidator');
const ReviewRepository = require('../repository/ReviewRepository');

module.exports = {

  async createReview(user, parsedReviewObject) {
    const errors = await ReviewValidator.reviewValidator(parsedReviewObject);

    if (errors === '') {
      return ReviewRepository.createReview(user._id, parsedReviewObject);
    }
    throw new Error('There was an error creating the review.');
  },

  async getReview(user, serviceId) {
    const query = {};
    query.user = user._id;
    query.serviceId = serviceId;
    query.deleted = false;
    return ReviewRepository.getReview(query);
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
