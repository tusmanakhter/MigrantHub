const GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('../models/MigrantUser');
const { googleConfig } = require('../config');
const { logger, formatMessage } = require('../config/winston');

const googleStrategy = new GoogleTokenStrategy({
  clientID: googleConfig.clientID,
  clientSecret: googleConfig.clientSecret,
  passReqToCallback: true,
},
((req, accessToken, refreshToken, profile, done) => {
  User.findOne({ 'googleAuthentication.id': profile.id }, (err, user) => {
    if (err) {
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        err.status, req.referer, 'GoogleTokenStrategy - Authenticate User', err.message));
      return done(err);
    }
    if (!user) {
      const newUser = new User();
      newUser._id = profile.emails[0].value;
      newUser.email = profile.emails[0].value;
      newUser.firstName = profile.name.givenName;
      newUser.lastName = profile.name.familyName;
      newUser.googleAuthentication = {
        id: profile.id,
        token: accessToken,
      };

      newUser.save((error, createdUser) => {
        if (error) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            error.status, req.referer, 'GoogleTokenStrategy - Authenticate User', error.message));
          return done(error);
        }
        return done(null, createdUser);
      });
    } else {
      return done(null, user);
    }
  });
}));

module.exports = googleStrategy;
