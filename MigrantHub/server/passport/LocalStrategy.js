const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserTypes = require('../lib/UserTypes');
const { logger, formatMessage } = require('../config/winston');

const localStrategy = new LocalStrategy({ passReqToCallback: true },
  ((req, username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'LocalStrategy - Authenticate User', err.message));
        return done(err);
      }
      if (!user || !user.localAuthentication) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          '404', req.referer, 'LocalStrategy - Authenticate User', 'Invalid user login attempt'));
        return done(null, false, { message: 'Incorrect email or password' });
      }
      if (!bcrypt.compareSync(password, user.localAuthentication.password)) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          '403', req.referer, 'LocalStrategy - Authenticate User', 'Invalid password login attempt'));
        return done(null, false, { message: 'Incorrect email or password' });
      }
      if (user.type === UserTypes.ADMIN && user.authorized === false) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          '403', req.referer, 'LocalStrategy - Authenticate User', 'Invalid admin login attempt'));
        return done(null, false, { message: 'Incorrect email or password' });
      }
      return done(null, user);
    }).select('localAuthentication authorized');
  }));

module.exports = localStrategy;
