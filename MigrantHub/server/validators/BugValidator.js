const validator = require('validator');

module.exports = {

  // Function to perform server-side validation of the create bug before sending to db.
  async bugValidator(bugObject) {
    let errors = '';
    if (validator.isEmpty(bugObject.bugName)) {
      errors += '\nBug name is required';
    }

    if (validator.isEmpty(bugObject.description)) {
      errors += '\nDescription is required';
    } else if (!validator.isLength(bugObject.description, { min: 10 })) {
      errors += '\nDescription must be at least 10 characters';
    }

    return errors;
  },
};
