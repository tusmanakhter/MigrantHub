var validator = require('validator');

// Function to perform server-side validation of the create event before sending to db.
const CreateEventValidator = (businessObject) =>{

    let errors = "";

    if (validator.isEmpty(businessObject.eventName)) {
        errors += "{'\n'}Event name is required";
    } else if (!validator.isAlpha(businessObject.eventName)) {
        errors += "{'\n'}Event name is not valid";
    }

    if (validator.isEmpty(businessObject.description)) {
        errors += "{'\n'}Description is required";
    } else if (!validator.isAlpha(businessObject.description)) {
        errors += "{'\n'}Description is not valid";
    } else if (!validator.isLength(businessObject.description, {min:10})) {
        errors += "{'\n'}Description must be at least 10 characters";
    }

    if (validator.isEmpty(businessObject.address)) {
        errors += "{'\n'}Address is required";
    }
  
    if (validator.isEmpty(businessObject.city)) {
        errors += "{'\n'}City is required";
    } else if (!validator.isAlpha(businessObject.city)) {
        errors += "{'\n'}This is not a valid city"
    }
  
    if (validator.isEmpty(businessObject.province)) {
        errors += "{'\n'}Province is required";
    }
  
    if (validator.isEmpty(businessObject.postalCode)) {
        errors += "{'\n'}Postal code is required";
    } else if (!validator.isLength(businessObject.postalCode, {min:7, max:7})) {
        errors += "{'\n'}Postal code is invalid";
    }
    if (!validator.matches(businessObject.postalCode, '[A - Za - z][0 - 9][A - Za - z] [0 - 9][A - Za - z][0 - 9]')) {
        errors += "{'\n'}Postal code should be in the format A1B 2E3";
    }

    if (validator.isEmpty(businessObject.phoneNumber)) {
        errors += "{'\n'}Phone number is required";
    } else if (!validator.isLength(businessObject.phoneNumber, {min:14, max:14})) {
        errors += "{'\n'}Phone number is invalid";
    }
    if (!validator.matches(businessObject.phoneNumber, '[\(]\d{3}[\)][ ]\d{3}[\-]\d{4}')) {
        errors += "{'\n'}Phone number should be in the format (123) 456-7890";
    }

    if (validator.isEmpty(businessObject.dateStart)) {
        errors += "{'\n'}Start date is required";
    } else if(validator.isBefore(businessObject.dateStart)) {
        errors += "{'\n'}Start date is invalid";
    }

    if (validator.isEmpty(businessObject.dateEnd)) {
        errors += "{'\n'}End date is required";
    } else if(validator.isBefore(businessObject.dateEnd, businessObject.dateStart)) {
        errors += "{'\n'}End date is invalid";
    }

    if (validator.isEmpty(businessObject.timeStart)) {
        errors += "{'\n'}Start time is required";
    } 

    if (validator.isEmpty(businessObject.timeEnd)) {
        errors += "{'\n'}End time is required";
    } else if (businessObject.secondsEnd <= businessObject.secondsStart) {
        errors += "{'\n'}End time is invalid";
    }

    return errors;
};

module.exports = CreateEventValidator;