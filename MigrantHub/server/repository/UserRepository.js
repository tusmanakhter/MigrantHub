const User = require('../models/User');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  getUser(userId) {
    return User.findOne({ _id: userId }).exec()
      .then(user => Promise.resolve(user)).catch((error) => {
        throw new ServerError('There was an error retrieving user.', 400, error);
      });
  },
};
