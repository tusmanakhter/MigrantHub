const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../models/MigrantUser');
const { facebookConfig } = require('../config');
const { logger, formatMessage } = require('../config/winston');

const facebookStrategy = new FacebookTokenStrategy({
  clientID: facebookConfig.clientID,
  clientSecret: facebookConfig.clientSecret,
  profileFields: facebookConfig.profileFields,
  passReqToCallback: true,
},
((req, accessToken, refreshToken, profile, done) => {
  User.findOne({ 'facebookAuthentication.id': profile.id }, (err, user) => {
    if (err) {
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        err.status, req.referer, 'FacebookTokenStrategy - Authenticate User', err.message));
      return done(err);
    }
    if (!user) {
      const newUser = new User();
      newUser._id = profile.emails[0].value.toLowerCase();
      newUser.email = profile.emails[0].value.toLowerCase();
      newUser.userType = 'facebook';
      newUser.firstName = profile.name.givenName;
      newUser.lastName = profile.name.familyName;
      newUser.facebookAuthentication = {
        id: profile.id,
        token: accessToken,
      };

      newUser.save((error, createdUser) => {
        if (error) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            error.status, req.referer, 'FacebookTokenStrategy - Authenticate User', error.message));
          return done(error);
        }
        return done(null, createdUser);
      });
    } else {
      return done(null, user);
    }
  });
}));

module.exports = facebookStrategy;
