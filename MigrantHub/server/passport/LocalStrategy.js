const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { logger, formatMessage } = require('../config/winston');

const strategy = new LocalStrategy({passReqToCallback: true},
    ((req, username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'LocalStrategy - Authenticate User' , err.message));
          return done(err);
      }
      if (!user) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              '404' , req.referer,'LocalStrategy - Authenticate User' ,'Invalid user login attempt'));
          return done(null, false, { message: 'Incorrect email' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              '403' , req.referer,'LocalStrategy - Authenticate User' ,'Invalid password login attempt' ));
          return done(null, false, { message: 'Incorrect password' });
      }
      if (user.type === 'admin' && user.authorized === false) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              '403' , req.referer,'LocalStrategy - Authenticate User' ,'Invalid admin login attempt'));
          return done(null, false, { message: 'Your admin account is not authorized yet' });
      }
      return done(null, user);
    });
  }),
);

module.exports = strategy;
