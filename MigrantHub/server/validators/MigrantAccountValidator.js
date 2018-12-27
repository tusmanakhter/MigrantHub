const validator = require('validator');

module.exports = {
  // Function to perform server-side validation of the create migrant account before sending to db.
  async migrantAccountValidator(migrantObject) {
    let errors = '';

    if (validator.isEmpty(migrantObject.email)) {
      errors += '\nEmail is required';
    } else if (!validator.isEmail(migrantObject.email)) {
      errors += '\nEmail is not valid';
    }
    if (validator.isEmpty(migrantObject.password)) {
      errors += '\nPassword is empty';
    } else if (validator.isEmpty(migrantObject.confirmPassword)) {
      errors += '\nConfirm password is empty';
    } else if (!validator.equals(migrantObject.password, migrantObject.confirmPassword)) {
      errors += '\nPasswords do not match';
    } else if (!validator.isLength(migrantObject.password, { min: 8 })) {
      errors += '\nPassword must be atleast 8 characters';
    }
    if (validator.isEmpty(migrantObject.firstName)) {
      errors += '\nFirst name is required and empty';
    } else if (!validator.isAlpha(migrantObject.firstName)) {
      errors += '\nFirst name is not valid';
    }
    if (validator.isEmpty(migrantObject.lastName)) {
      errors += '\nLast name is required and empty';
    } else if (!validator.isAlpha(migrantObject.lastName)) {
      errors += '\nLast name is not valid';
    }
    if (migrantObject.city !== undefined && !validator.isAlpha(migrantObject.city)) {
      errors += '\nThis is not a valid city';
    }
    if (migrantObject.postalCode !== undefined) {
      if (!validator.isLength(migrantObject.postalCode, { min: 7, max: 7 })) {
        errors += '\nPostal code is invalid';
      } else if (!validator.matches(migrantObject.postalCode, '[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]')) {
        errors += '\nPostal is should be in the format A1B 2E3';
      }
    }
    if (migrantObject.phoneNumber !== undefined) {
      if (!validator.isLength(migrantObject.phoneNumber, { min: 14, max: 14 })) {
        errors += '\nPhone number is invalid';
      } else if (!validator.matches(migrantObject.phoneNumber, '[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}')) {
        errors += '\nPhone number should be in the format (123) 456-7890';
      }
    }
    if (validator.isEmpty(migrantObject.age)) {
      errors += '\nAge is required and empty';
    } else if (!Number.isInteger(migrantObject.age) && migrantObject.age < 0) {
      errors += '\nAge should be a valid number greater than 0.';
    }
    if (validator.isEmpty(migrantObject.gender)) {
      errors += '\nGender is required and empty';
    }
    if (validator.isEmpty(migrantObject.nationality)) {
      errors += '\nNationality is required and empty';
    } else if (!validator.isAlpha(migrantObject.nationality)) {
      errors += '\nThis is not a valid nationality';
    }
    if (validator.isEmpty(migrantObject.relationshipStatus)) {
      errors += '\nRelationship status is required and empty';
    }
    if (validator.isEmpty(migrantObject.status)) {
      errors += '\nStatus is required and empty';
    }
    if (migrantObject.motherTongue !== undefined
      && !validator.isAlpha(migrantObject.motherTongue)) {
      errors += '\nMother tongue is not valid';
    }
    if (typeof migrantObject.languages !== 'undefined') {
      migrantObject.languages.forEach((language) => {
        if (validator.isEmpty(language.name)) {
          errors += '\nLanguage name is required and empty';
        } else if (!validator.isAlpha(language.name)) {
          errors += '\nLanguage name is not valid';
        }
        if (validator.isEmpty(language.writingLevel)) {
          errors += '\nAdditional language writing level is required and empty';
        }
        if (validator.isEmpty(language.speakingLevel)) {
          errors += '\nAdditional language speaking level is required and empty';
        }
      });
    }
    if (typeof migrantObject.family !== 'undefined') {
      migrantObject.family.forEach((member) => {
        if (validator.isEmpty(member.age)) {
          errors += '\nFamily member age is required and empty';
        } else if (!Number.isInteger(member.age) && member.age < 0) {
          errors += "\nFamily member's age should be a valid number greater than 0.";
        }
        if (validator.isEmpty(member.gender)) {
          errors += '\nFamily member gender is required and empty';
        }
        if (validator.isEmpty(member.relationshipStatus)) {
          errors += '\nFamily member relationship status is required and empty';
        }
        if (validator.isEmpty(member.relation)) {
          errors += '\nFamily member relation is required and empty';
        }
      });
    }
    if (validator.isEmpty(migrantObject.educationLevel)) {
      errors += '\nEducation level is required and empty';
    }
    if (validator.isEmpty(migrantObject.jobStatus)) {
      errors += '\nJob status is required and empty';
    }
    if (migrantObject.lookingForJob !== undefined
       && !validator.isBoolean(migrantObject.lookingForJob)) {
      errors += '\nThe looking for a job field value is invalid';
    }
    if (migrantObject.currentIncome !== undefined
        && !validator.isEmpty(migrantObject.currentIncome)
        && !validator.isDivisibleBy(migrantObject.currentIncome, 1)
        && migrantObject.currentIncome < 0) {
      errors += '\nThe current income value is not valid';
    }
    if (typeof migrantObject.workExperience !== 'undefined') {
      migrantObject.workExperience.forEach((job) => {
        if (validator.isEmpty(job.title)) {
          errors += '\nWork experience title is required and empty';
        } else if (!validator.isAlpha(job.title)) {
          errors += '\nWork experience title is not valid';
        }
        if (validator.isEmpty(job.company)) {
          errors += '\nCompany is required and empty';
        }
        if (validator.isEmpty(job.years)) {
          errors += '\nEmployment length is required and empty';
        } else if (!validator.isDivisibleBy(job.years, 1) || job.years < 0) {
          errors += '\nEmployment length is not valid';
        }
      });
    }
    if (validator.isEmpty(migrantObject.settlingLocation)) {
      errors += '\nSettling location is required and empty';
    }
    if (validator.isEmpty(migrantObject.joiningReason)) {
      errors += '\nJoining reason is required and empty';
    }
    return errors;
  },
};
