const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const strategy = new LocalStrategy(

  ((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err);
      } if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      } if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      if (user.type === 'admin' && user.authorized === false) {
        return done(null, false, { message: 'Your admin account is not authorized yet' });
      }
      return done(null, user);
    });
  }),
);

module.exports = strategy;
