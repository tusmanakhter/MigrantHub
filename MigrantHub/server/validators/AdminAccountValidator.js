const validator = require('validator');

module.exports = {
  // Function to perform server-side validation of the create business account before sending to db.
  async adminAccountValidator(adminObject) {
    let errors = '';

    if (validator.isEmpty(adminObject.email)) {
      errors += "{'\n'}Email is required";
    } else if (!validator.isEmail(adminObject.email)) {
      errors += "{'\n'}Email is not valid";
    }
    if (validator.isEmpty(adminObject.password)) {
      errors += "{'\n'}Password is empty";
    } else if (!validator.isLength(adminObject.password, { min: 8 })) {
      errors += "{'\n'}Password must be atleast 8 characters";
    }

    return errors;
  },
};
