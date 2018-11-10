const validator = require('validator');

// Function to perform server-side validation of the create business account before sending to db.
const AdminAccountValidator = (adminObject) => {
  let errors = '';

  if (validator.isEmpty(adminObject.email)) {
    errors += "{'\n'}Email is required";
  } else if (!validator.isEmail(adminObject.email)) {
    errors += "{'\n'}Email is not valid";
  }
  if (validator.isEmpty(adminObject.password)) {
    errors += "{'\n'}Password is empty";
  } else if (validator.isEmpty(adminObject.confirmPassword)) {
    errors += "{'\n'}Confirm password is empty";
  } else if (!validator.equals(adminObject.password, adminObject.confirmPassword)) {
    errors += "{'\n'}Passwords do not match";
  } else if (!validator.isLength(adminObject.password, { min: 8 })) {
    errors += "{'\n'}Password must be atleast 8 characters";
  }

  return errors;
};

module.exports = AdminAccountValidator;
