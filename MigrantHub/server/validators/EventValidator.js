const validator = require('validator');

module.exports = {

  // Function to perform server-side validation of the create event before sending to db.
  async eventValidator(businessObject) {
    let errors = '';
    if (validator.isEmpty(businessObject.eventName)) {
      errors += '\nEvent name is required';
    }

    if (validator.isEmpty(businessObject.description)) {
      errors += '\nDescription is required';
    } else if (!validator.isLength(businessObject.description, { min: 10 })) {
      errors += '\nDescription must be at least 10 characters';
    }

    if (typeof businessObject.location !== 'undefined') {
      if (validator.isEmpty(businessObject.location.address)) {
        errors += '\nAddress is required';
      }

      if (validator.isEmpty(businessObject.location.city)) {
        errors += '\nCity is required';
      } else if (validator.isNumeric(businessObject.location.city)) {
        errors += '\nCity is invalid';
      }

      if (validator.isEmpty(businessObject.location.province)) {
        errors += '\nProvince is required';
      }

      if (validator.isEmpty(businessObject.location.postalCode)) {
        errors += '\nPostal code is required';
      } else if (!validator.isLength(businessObject.location.postalCode, { min: 7, max: 7 })) {
        errors += '\nPostal code is invalid';
      }
      if (!validator.matches(businessObject.location.postalCode, '[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]')) {
        errors += '\nPostal code should be in the format A1B 2E3';
      }

      if (validator.isEmpty(businessObject.location.phoneNumber)) {
        errors += '\nPhone number is required';
      } else if (!validator.isLength(businessObject.location.phoneNumber, { min: 14, max: 14 })) {
        errors += '\nPhone number is invalid';
      }
      if (!validator.matches(businessObject.location.phoneNumber, '^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')) {
        errors += '\nPhone number should be in the format (123) 456-7890';
      }
    }

    if (validator.isEmpty(businessObject.dateStart)) {
      errors += '\nStart date is required';
    } else if (validator.isBefore(businessObject.dateStart)) {
      errors += '\nStart date is invalid';
    }

    if (validator.isEmpty(businessObject.dateEnd)) {
      errors += '\nEnd date is required';
    } else if (validator.isBefore(businessObject.dateEnd, businessObject.dateStart)) {
      errors += '\nEnd date is invalid';
    }

    if (validator.isEmpty(businessObject.timeStart)) {
      errors += '\nStart time is required';
    }

    if (validator.isEmpty(businessObject.timeEnd)) {
      errors += '\nEnd time is required';
    } else if (businessObject.secondsEnd <= businessObject.secondsStart) {
      errors += '\nEnd time is invalid';
    }

    return errors;
  },
};
