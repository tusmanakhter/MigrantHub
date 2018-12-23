const MigrantUser = require('../models/MigrantUser');

module.exports = {
  createUser(userObject) {
    const user = new MigrantUser();
    user._id = userObject.email;
    user.email = userObject.email;
    user.localAuthentication = {
      password: userObject.password,
    };
    user.firstName = userObject.firstName;
    user.lastName = userObject.lastName;
    user.address = userObject.address;
    user.apartment = userObject.apartment;
    user.city = userObject.city;
    user.province = userObject.province;
    user.postalCode = userObject.postalCode;
    user.phoneNumber = userObject.phoneNumber;
    user.age = userObject.age;
    user.gender = userObject.gender;
    user.nationality = userObject.nationality;
    user.relationshipStatus = userObject.relationshipStatus;
    user.status = userObject.status;
    user.languages = userObject.languages;
    user.writingLevel = userObject.writingLevel;
    user.speakingLevel = userObject.speakingLevel;
    user.motherTongue = userObject.motherTongue;
    user.family = userObject.family;
    user.educationLevel = userObject.educationLevel;
    user.proficiencyExams = userObject.proficiencyExams;
    user.jobStatus = userObject.jobStatus;
    user.lookingForJob = userObject.lookingForJob;
    user.currentIncome = userObject.currentIncome;
    user.workExperience = userObject.workExperience;
    user.settlingLocation = userObject.settlingLocation;
    user.settlingDuration = userObject.settlingDuration;
    user.joiningReason = userObject.joiningReason;

    return user.save().then(() => Promise.resolve('Migrant User has been created.')).catch(() => {
      throw new Error('There was an error saving migrant user.');
    });
  },

  getMigrantUser(migrantUserId) {
      return MigrantUser.findOne({ _id: migrantUserId}).exec().then(businessUser =>
          Promise.resolve(businessUser)).catch(() => {throw new Error('There was an error retrieving migrant user.');
      });
  },

    editMigrantUser(migrantUserId, migrantUserObject) {
      return MigrantUser.findByIdAndUpdate(migrantUserId, migrantUserObject, { new: true }).exec().then(services =>
          Promise.resolve('Migrant user has been updated.')).catch(() => {
          throw new Error('There was an error retrieving updating migrant user.');
      });
  },
};
