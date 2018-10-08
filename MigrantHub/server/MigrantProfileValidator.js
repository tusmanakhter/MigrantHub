var validator = require('validator');

// Function to perform server-side validation of the create migrant account before sending to db.
const MigrantProfileValidator = (migrantObject) =>{

    let errors = "";

    if (validator.isEmpty(migrantObject.email)) {
        errors += "{'\n'}Email is required";
    } else if (!validator.isEmail(migrantObject.email)) {
        errors += "{'\n'}Email is not valid"
    }
    if (validator.isEmpty(migrantObject.password)) {
        errors += "{'\n'}Password is empty"
    } else if (validator.isEmpty(migrantObject.confirmPassword)) {
        errors += "{'\n'}Confirm password is empty"
    } else if (!validator.equals(migrantObject.password, migrantObject.confirmPassword)) {
        errors += "{'\n'}Passwords do not match"
    } else if (!validator.isLength(migrantObject.password, {min: 8})) {
        errors += "{'\n'}Password must be atleast 8 characters";
    }
    if (validator.isEmpty(migrantObject.firstName)) {
        errors += "{'\n'}First name is required and empty";
    } else if (!validator.isAlpha(migrantObject.firstName)) {
        errors += "{'\n'}First name is not valid"
    }
    if (validator.isEmpty(migrantObject.lastName)) {
        errors += "{'\n'}Last name is required and empty";
    } else if (!validator.isAlpha(migrantObject.lastName)) {
        errors += "{'\n'}Last name is not valid"
    }
    if (validator.isEmpty(migrantObject.address)) {
        errors += "{'\n'}Address is required and empty";
    }
    if (validator.matches(migrantObject.postalCode, '[A - Za - z][0 - 9][A - Za - z] [0 - 9][A - Za - z][0 - 9]')) {
        errors += "{'\n'}Postal is should be in the format A1B 2E3";
    }
    if (validator.isEmpty(migrantObject.city)) {
        errors += "{'\n'}City is required and empty";
    } else if (!validator.isAlpha(migrantObject.city)) {
        errors += "{'\n'}This is not a valid city"
    }
    if (validator.isEmpty(migrantObject.province)) {
        errors += "{'\n'}Province is required and empty";
    }
    if (validator.isEmpty(migrantObject.postalCode)) {
        errors += "{'\n'}Postal code is required and empty";
    } else if (!validator.isLength(migrantObject.postalCode, {min: 7, max: 7})) {
        errors += "{'\n'}Postal code is invalid";
    }
    if (validator.isEmpty(migrantObject.phoneNumber)) {
        errors += "{'\n'}Phone number is required and empty";
    } else if (!validator.isLength(migrantObject.phoneNumber, {min: 14, max: 14})) {
        errors += "{'\n'}Phone number is invalid";
    }
    if (validator.matches(migrantObject.phoneNumber, '[\(]\d{3}[\)][ ]\d{3}[\-]\d{4}')) {
        errors += "{'\n'}Phone number should be in the format (123) 456-7890";
    }
    if (validator.isEmpty(migrantObject.age)) {
        errors += "{'\n'}Age is required and empty";
    }
    if (!Number.isInteger(migrantObject.age) && migrantObject.age < 0) {
        errors += "{'\n'}Age should be a valid number greater than 0.";
    }
    if (validator.isEmpty(migrantObject.gender)) {
        errors += "{'\n'}Gender is required and empty";
    }
    if (validator.isEmpty(migrantObject.nationality)) {
        errors += "{'\n'}Nationality is required and empty";
    } else if (!validator.isAlpha(migrantObject.nationality)) {
        errors += "{'\n'}This is not a valid nationality"
    }
    if (validator.isEmpty(migrantObject.relationshipStatus)) {
        errors += "{'\n'}Relationship status is required and empty";
    }
    if (validator.isEmpty(migrantObject.status)) {
        errors += "{'\n'}Status is required and empty";
    }
    if (validator.isEmpty(migrantObject.motherTongue)) {
        errors += "{'\n'}Mother tongue is required and empty";
    } else if (!validator.isAlpha(migrantObject.motherTongue)) {
        errors += "{'\n'}Mother tongue is not valid"
    }
    if (validator.isEmpty(migrantObject.writingLevel)) {
        errors += "{'\n'}Writing level is required and empty";
    }
    if (validator.isEmpty(migrantObject.speakingLevel)) {
        errors += "{'\n'}Speaking level is required and empty";
    }
    if(typeof migrantObject.languages !== 'undefined') {
        migrantObject.languages.forEach((language, index) => {
            if (validator.isEmpty(language.name)) {
                errors += "{'\n'}Language name is required and empty";
            } else if (!validator.isAlpha(language.name)) {
                errors += "{'\n'}Language name is not valid"
            }
            if (validator.isEmpty(language.writingLevel)) {
                errors += "{'\n'}Additional language writing level is required and empty";
            }
            if (validator.isEmpty(language.speakingLevel)) {
                errors += "{'\n'}Additional language speaking level is required and empty";
            }
        });
    }
    if(typeof  migrantObject.family !== 'undefined') {
        migrantObject.family.forEach((member, index) => {
            if (validator.isEmpty(member.age)) {
                errors += "{'\n'}Family member age is required and empty";
            }
            if (!Number.isInteger(member.age) && member.age < 0) {
                errors += "{'\n'}Family member's age should be a valid number greater than 0.";
            }
            if (validator.isEmpty(member.gender)) {
                errors += "{'\n'}Family member gender is required and empty";
            }
            if (validator.isEmpty(member.relationshipStatus)) {
                errors += "{'\n'}Family member relationship status is required and empty";
            }
            if (validator.isEmpty(member.relation)) {
                errors += "{'\n'}Family member relation is required and empty";
            }
        });
    }
    if (validator.isEmpty(migrantObject.educationLevel)) {
        errors += "{'\n'}Education level is required and empty";
    }
    if (validator.isEmpty(migrantObject.jobStatus)) {
        errors += "{'\n'}Job status is required and empty";
    }
    if (validator.isEmpty(migrantObject.lookingForJob)) {
        errors += "{'\n'}The looking for a job field is required and empty";
    }
    if (!validator.isBoolean(migrantObject.lookingForJob)) {
        errors += "{'\n'}The looking for a job field value is invalid";
    }
    if (!validator.isBoolean(migrantObject.proficiencyExams.french)) {
        errors += "{'\n'}The french proficiency exam value seems to be invalid.";
    }
    if (!validator.isBoolean(migrantObject.proficiencyExams.ielts)) {
        errors += "{'\n'}The IELTS proficiency exam value seems to be invalid.";
    }
    if (validator.isEmpty(migrantObject.jobStatus)) {
        errors += "{'\n'}The job status field is required and empty";
    }
    if (!validator.isEmpty(migrantObject.currentIncome) && !validator.isDivisibleBy(migrantObject.currentIncome, 1)) {
        errors += "{'\n'}The current income value is not valid";
    }
    if(typeof migrantObject.workExperience !== 'undefined') {
        migrantObject.workExperience.forEach((job, index) => {
            if (validator.isEmpty(job.title)) {
                errors += "{'\n'}Work experience title is required and empty";
            } else if (!validator.isAlpha(job.title)) {
                errors += "{'\n'}Work experience title is not valid";
            }
            if (validator.isEmpty(job.company)) {
                errors += "{'\n'}Company is required and empty";
            }
            if (validator.isEmpty(job.years)) {
                errors += "{'\n'}Employment length is required and empty";
            }
            if (!validator.isDivisibleBy(job.years, 1) || job.years < 0) {
                errors += "{'\n'}Employment length is not valid";
            }
        });
    }
    if (validator.isEmpty(migrantObject.settlingLocation)) {
        errors += "{'\n'}Settling location is required and empty";
    }
    if (validator.isEmpty(migrantObject.settlingDuration)) {
        errors += "{'\n'}Settling duration is required and empty";
    }
    if (validator.isEmpty(migrantObject.joiningReason)) {
        errors += "{'\n'}Joining reason is required and empty";
    }
    return errors;
};

module.exports = MigrantProfileValidator;