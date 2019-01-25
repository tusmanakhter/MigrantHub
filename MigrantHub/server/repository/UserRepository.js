const User = require('../models/User');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  getUser(userId) {
    return User.findOne({ _id: userId }).exec()
      .then(user => Promise.resolve(user)).catch((error) => {
        throw new ServerError('There was an error retrieving user.', 400, error);
      });
  },

  update(userId, userObject) {
      return User.findByIdAndUpdate({ _id: userId }, userObject, { new: true })
          .exec().then(() => Promise.resolve('User has been updated.')).catch((error) => {
          throw new ServerError('There was an error updating user.', 400, error);
      });
  },
};
