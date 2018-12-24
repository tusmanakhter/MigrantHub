const Review = require('../models/Review');

module.exports = {

  createReview(reviewUser, parsedReviewObject) {
    const review = new Review();
    review.user = reviewUser;
    review.serviceId = parsedReviewObject.serviceId;
    review.rating = parsedReviewObject.rating;
    review.comment = parsedReviewObject.comment;
    return review.save().then(() => Promise.resolve('Review has been created.')).catch(() => {
      throw new Error('There was an error creating the review.');
    });
  },

  getReview(query) {
    return Review.findOne(query).exec().then(review => Promise.resolve(review)).catch(() => {
      throw new Error('There was an error retrieving review.');
    });
  },

  getReviews(query) {
    return Review.find(query).exec().then(reviews => Promise.resolve(reviews)).catch(() => {
      throw new Error('There was an error getting reviews.');
    });
  },

  deleteReview(reviewId) {
    return Review.updateOne({ _id: reviewId }, {
      deleted: true,
      deletedDate: Date.now(),
    }).exec().then(() => Promise.resolve('Review has been deleted.')).catch(() => {
      throw new Error('There was an error deleting review.');
    });
  },
};
