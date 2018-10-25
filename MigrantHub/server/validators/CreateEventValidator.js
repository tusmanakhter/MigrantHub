var validator = require('validator');

// Function to perform server-side validation of the create event before sending to db.
const CreateEventValidator = (businessObject) =>{

    let errors = "";
    if (validator.isEmpty(businessObject.eventName)) {
        errors += "\nEvent name is required";
    } else if (!validator.isAlpha(businessObject.eventName)) {
        errors += "\nEvent name is not valid";
    }

    if (validator.isEmpty(businessObject.description)) {
        errors += "\nDescription is required";
    } else if (!validator.isAlpha(businessObject.description)) {
        errors += "\nDescription is not valid";
    } else if (!validator.isLength(businessObject.description, {min:10})) {
        errors += "\nDescription must be at least 10 characters";
    }

    if (validator.isEmpty(businessObject.address)) {
        errors += "\nAddress is required";
    }
  
    if (validator.isEmpty(businessObject.city)) {
        errors += "\nCity is required";
    } else if (!validator.isAlpha(businessObject.city)) {
        errors += "\nThis is not a valid city"
    }
  
    if (validator.isEmpty(businessObject.province)) {
        errors += "\nProvince is required";
    }

    if (validator.isEmpty(businessObject.postalCode)) {
        errors += "\nPostal code is required";
    } else if (!validator.isLength(businessObject.postalCode, {min:7, max:7})) {
        errors += "\nPostal code is invalid";
    }
    if (!validator.matches(businessObject.postalCode, '[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]')) {
        errors += "\nPostal code should be in the format A1B 2E3";
    }

    if (validator.isEmpty(businessObject.phoneNumber)) {
        errors += "\nPhone number is required";
    } else if (!validator.isLength(businessObject.phoneNumber, {min:14, max:14})) {
        errors += "\nPhone number is invalid";
    }
    if (!validator.matches(businessObject.phoneNumber, '^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')) {
        errors += "\nPhone number should be in the format (123) 456-7890";
    }

    if (validator.isEmpty(businessObject.dateStart)) {
        errors += "\nStart date is required";
    } else if(validator.isBefore(businessObject.dateStart)) {
        errors += "\nStart date is invalid";
    }

    if (validator.isEmpty(businessObject.dateEnd)) {
        errors += "\nEnd date is required";
    } else if(validator.isBefore(businessObject.dateEnd, businessObject.dateStart)) {
        errors += "\nEnd date is invalid";
    }

    if (validator.isEmpty(businessObject.timeStart)) {
        errors += "\nStart time is required";
    } 

    if (validator.isEmpty(businessObject.timeEnd)) {
        errors += "\nEnd time is required";
    } else if (businessObject.secondsEnd <= businessObject.secondsStart) {
        errors += "\nEnd time is invalid";
    }

    return errors;
};

module.exports = CreateEventValidator;