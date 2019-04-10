const MigrantUser = require('../models/MigrantUser');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  createUser(userObject) {
    const user = new MigrantUser();
    user._id = userObject.email.toLowerCase();
    user.email = userObject.email.toLowerCase();
    user.userType = 'local';
    user.localAuthentication = {
      password: userObject.password,
    };
    user.firstName = userObject.firstName;
    user.lastName = userObject.lastName;
    user.age = userObject.age;
    user.gender = userObject.gender;
    user.nationality = userObject.nationality;
    user.relationshipStatus = userObject.relationshipStatus;
    user.status = userObject.status;
    user.educationLevel = userObject.educationLevel;
    user.jobStatus = userObject.jobStatus;
    user.settlingLocation = userObject.settlingLocation;
    user.joiningReason = userObject.joiningReason;

    return user.save().then(() => Promise.resolve('Migrant User has been created.')).catch(() => {
      throw new ServerError('There was an error saving migrant user.');
    });
  },

  getMigrantUser(migrantUserId) {
    return MigrantUser.findOne({ _id: migrantUserId.toLowerCase() }).select('-deleted -deletedDate -type -_id -__v -userType').exec()
      .then(migrantUser => Promise.resolve(migrantUser))
      .catch((error) => {
        throw new ServerError('There was an error retrieving migrant user.', 400, error);
      });
  },

  editMigrantUser(migrantUserId, migrantUserObject) {
    return MigrantUser.findByIdAndUpdate({ _id: migrantUserId.toLowerCase() }, migrantUserObject,
      { new: true }).exec().then(() => Promise.resolve('Profile updated succesfully.')).catch((error) => {
      throw new ServerError('There was an error retrieving updating migrant user.', 400, error);
    });
  },

  updateMigrantUser(migrantUserId, query) {
    return MigrantUser.findByIdAndUpdate({ _id: migrantUserId }, query,
      { new: true }).exec()
      .then(() => Promise.resolve('Migrant user has been updated.')).catch((error) => {
        throw new ServerError('There was an error updating migrant user in db.', 400, error);
      });
  },
};
