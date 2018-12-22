const validator = require('validator');
const User = require('../models/User');
const Service = require('../models/Service');
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

  // helper function: checks if user exists in migrant table
  async function checkIfMigrantUser(user) {
    let checkError = '';
    try {
      const record = await User.findOne({
        _id: user,
      });
      if (record) {
        if (record.type !== 'migrant') {
          checkError = 'Only migrants can post reviews.';
        }
      } else {
        checkError = 'Error validating user. Please log out and back in and try again.';
      }
    } catch (e) {
      checkError = 'Server Errors. Please log out and back in and try again.';
    }
    return checkError;
  }

  // helper function: makes sure the user isn't the owner of the service
  async function checkForOwnerReview(user, serviceId) {
    let checkError = '';
    try {
      const record = await Service.findOne({
        email: user,
        _id: serviceId,
      });
      if (record) {
        checkError = 'You cannot review your own service.';
      }
    } catch (e) {
      checkError = 'Server Errors. Please log out and back in and try again.';
    }
    return checkError;
  }

  // helper function: makes sure the user hasn't already reviewed this service
  async function checkForExistingReview(user, serviceId) {
    let checkError = '';
    try {
      const record = await ReviewService.findOne({
        user,
        serviceId,
      });
      if (record) {
        checkError = 'Your review for this service already exists.';
      }
    } catch (e) {
      checkError = 'Server Errors. Please log out and back in and try again.';
    }
    return checkError;
  }

  // make sure user is a migrant
  const migrantUserError = await checkIfMigrantUser(reviewObject.user);
  if (migrantUserError) {
    error = migrantUserError;
  }

  // make sure the user isn't reviewing their own service
  const ownerReviewError = await checkForOwnerReview(reviewObject.user, reviewObject.serviceId);
  if (ownerReviewError) {
    error = ownerReviewError;
  }

  // make sure the user hasn't already reviewed this service
  const existingReviewError = await checkForExistingReview(reviewObject.user,
    reviewObject.serviceId);
  if (existingReviewError) {
    error = existingReviewError;
  }

  return error;
}

module.exports = ReviewValidator;
