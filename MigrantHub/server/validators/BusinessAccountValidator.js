var validator = require('validator');

// Function to perform server-side validation of the create business account before sending to db.
const BusinessAccountValidator = (businessObject) =>{

    let errors = "";

    if (validator.isEmpty(businessObject.email)) {
        errors += "{'\n'}Email is required";
    } else if (!validator.isEmail(businessObject.email)) {
        errors += "{'\n'}Email is not valid"
    }
    if (validator.isEmpty(businessObject.corpId)) {
        errors += "{'\n'}Corporation ID is required";
    }
    if (validator.isEmpty(businessObject.password)) {
        errors += "{'\n'}Password is empty"
    } else if (validator.isEmpty(businessObject.confirmPassword)) {
        errors += "{'\n'}Confirm password is empty"
    } else if (!validator.equals(businessObject.password, businessObject.confirmPassword)) {
        errors += "{'\n'}Passwords do not match"
    } else if (!validator.isLength(businessObject.password, {min: 8})) {
        errors += "{'\n'}Password must be atleast 8 characters";
    }
    if (validator.isEmpty(businessObject.firstName)) {
        errors += "{'\n'}First name is required and empty";
    } else if (!validator.isAlpha(businessObject.firstName)) {
        errors += "{'\n'}First name is not valid"
    }
    if (validator.isEmpty(businessObject.lastName)) {
        errors += "{'\n'}Last name is required and empty";
    } else if (!validator.isAlpha(businessObject.lastName)) {
        errors += "{'\n'}Last name is not valid"
    }
    if (validator.isEmpty(businessObject.address)) {
        errors += "{'\n'}Address is required and empty";
    }
    if (validator.matches(businessObject.postalCode, '[A - Za - z][0 - 9][A - Za - z] [0 - 9][A - Za - z][0 - 9]')) {
        errors += "{'\n'}Postal code should be in the format A1B 2E3";
    }
    if (validator.isEmpty(businessObject.city)) {
        errors += "{'\n'}City is required and empty";
    } else if (!validator.isAlpha(businessObject.city)) {
        errors += "{'\n'}This is not a valid city"
    }
    if (validator.isEmpty(businessObject.province)) {
        errors += "{'\n'}Province is required and empty";
    }
    if (validator.isEmpty(businessObject.postalCode)) {
        errors += "{'\n'}Postal code is required and empty";
    } else if (!validator.isLength(businessObject.postalCode, {min: 7, max: 7})) {
        errors += "{'\n'}Postal code is invalid";
    }
    if (validator.isEmpty(businessObject.phoneNumber)) {
        errors += "{'\n'}Phone number is required and empty";
    } else if (!validator.isLength(businessObject.phoneNumber, {min: 14, max: 14})) {
        errors += "{'\n'}Phone number is invalid";
    }
    if (validator.matches(businessObject.phoneNumber, '[\(]\d{3}[\)][ ]\d{3}[\-]\d{4}')) {
        errors += "{'\n'}Phone number should be in the format (123) 456-7890";
    }
    return errors;
};

module.exports = BusinessAccountValidator;