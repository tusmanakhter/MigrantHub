const passport = require('passport');
const LocalStrategy = require('./LocalStrategy');
const User = require('../models/User');
let fflip = require('fflip');

passport.serializeUser((user, done) => {
    done(null, { _id: user._id, type: user.type, firstName: user.firstName, lastName: user.lastName });
});

passport.deserializeUser((req, user, done) => {
  User.findOne(
      { _id: user._id },
      { type: true , lastName: true , firstName: true },
      (err, foundUser) => {
          req.fflip.setForUser(foundUser);
          done(null, foundUser);
    },
  );
});

passport.use(LocalStrategy);
module.exports = passport;
