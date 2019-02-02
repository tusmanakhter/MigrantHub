const validator = require('validator');

module.exports = {
  // Function to perform server-side validation of services before sending to db.
  async serviceValidator(serviceObject) {
    let errors = '';

    if (validator.isEmpty(serviceObject.serviceTitle)) {
      errors += '\nService Title is empty';
    }
    if (validator.isEmpty(serviceObject.serviceDescription)) {
      errors += '\nService Description is empty';
    }
    if (validator.isEmpty(serviceObject.serviceSummary)) {
      errors += '\nService summary is empty';
    }

    if (typeof serviceObject.serviceDate !== 'undefined') {
      const date = new Date();
      const todaysDate = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

      if (validator.isEmpty(serviceObject.serviceDate.startDate)) {
        errors += '\nStart date is required';
      } else if (validator.isBefore(serviceObject.serviceDate.startDate, todaysDate)) {
        errors += '\nStart date is invalid';
      }
      if (validator.isEmpty(serviceObject.serviceDate.endDate)) {
        errors += '\nEnd date is required';
      } else if (validator.isBefore(serviceObject.serviceDate.endDate,
        serviceObject.serviceDate.startDate)) {
        errors += '\nEnd date should be after start date';
      }
    }

    if (typeof serviceObject.location !== 'undefined') {
      if (validator.isEmpty(serviceObject.location.address)) {
        errors += '\nAddress is required and empty';
      }
      if (validator.isEmpty(serviceObject.location.city)) {
        errors += '\nCity is required and empty';
      } else if (!validator.isAlpha(serviceObject.location.city)) {
        errors += '\nThis is not a valid city';
      }
      if (validator.isEmpty(serviceObject.location.province)) {
        errors += '\nProvince is required and empty';
      }
      if (validator.isEmpty(serviceObject.location.postalCode)) {
        errors += '\nPostal code is required and empty';
      } else if (!validator.isLength(serviceObject.location.postalCode, { min: 7, max: 7 })) {
        errors += '\nPostal code is invalid';
      } else if (!validator.matches(serviceObject.location.postalCode, '[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]')) {
        errors += '\nPostal is should be in the format A1B 2E3';
      }
      if (validator.isEmpty(serviceObject.location.phoneNumber)) {
        errors += '\nPhone number is required and empty';
      } else if (!validator.isLength(serviceObject.location.phoneNumber, { min: 14, max: 14 })) {
        errors += '\nPhone number is invalid';
      } else if (!validator.matches(serviceObject.location.phoneNumber, '^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$')) {
        errors += '\nPhone number should be in the format (123) 456-7890';
      }
    }

    if (typeof serviceObject.serviceHours !== 'undefined') {
      const re = /^\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))$/;
      serviceObject.serviceHours.forEach((day) => {
        if (validator.isEmpty(day.serviceDay)) {
          errors += '\nService day is required and empty';
        }
        if (validator.isEmpty(day.startTime)) {
          errors += '\nService hour start time required and empty';
        } else if (!validator.matches(day.startTime, re)) {
          errors += '\nService hour start time should be in the format 13:57';
        }
        if (validator.isEmpty(day.endTime)) {
          errors += '\nService hour end time required and empty';
        } else if (!validator.matches(day.endTime, re)) {
          console.log(day.endTime);
          errors += '\nService hour end time should be in the format 13:57';
        } else if (day.endTime <= day.startTime) {
          errors += '\nEnd time should be after start time';
        }
      });
    }
    return errors;
  },
};
