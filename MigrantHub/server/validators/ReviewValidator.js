const validator = require('validator');

module.exports = {

  // Function to perform server-side validation of reviews before sending to db.
  async reviewValidator(reviewObject) {
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

    return error;
  },
};
