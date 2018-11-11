const validator = require('validator');
const User = require('../models/User');
const ReviewService = require('../models/ReviewService');

// Function to perform server-side validation of reviews before sending to db.
async function ReviewValidator(reviewObject) {
  let error = '';

  if (validator.isEmpty(reviewObject.rating)) {
    error = '\nReview rating cannot be empty';
  }
  if (validator.isEmpty(reviewObject.comment)) {
    error = '\nReview comment cannot be empty';
  }
  if (validator.isEmpty(reviewObject.serviceId) || validator.isEmpty(reviewObject.user)) {
    error = '\nError. Please log out and back in and try again.';
  }

  //make sure user is a migrant
  const migrantUserError = await checkIfMigrantUser(reviewObject.user);
  if (migrantUserError) {
    error = migrantUserError;
  }

  //make sure the user hasn't already reviewed this service
  const existingReviewError = await checkForExistingReview(reviewObject.user, reviewObject.serviceId);
  if (existingReviewError) {
    error = existingReviewError;
  }

  // helper function: checks if user exists in migrant table
  async function checkIfMigrantUser(user) {
    let error = '';
    try {
      const record = await User.findOne({
        _id: user
      });
      if (record) {
        if (record.type !== 'migrant') {
          error = 'Only migrants can post reviews.';
        }
      } else {
        error = 'Error validating user. Please log out and back in and try again.';
      }
    } catch (e) {
      error = 'Server Errors. Please log out and back in and try again.';
    }
    return error;
  }

  // helper function: makes sure the user hasn't already reviewed this service
  async function checkForExistingReview(user, serviceId) {
    let error = '';
    try {
      const record = await ReviewService.findOne({
        user: user,
        serviceId: serviceId
      });
      if (record) {
        error = 'Your review for this service already exists.';
      }
    } catch (e) {
      error = 'Server Errors. Please log out and back in and try again.';
    }
    return error;
  }
  return error;
}

module.exports = ReviewValidator;
