const { logger, formatMessage } = require('../config/winston');
const User = require('../models/User');
const UserTypes = require('../lib/UserTypes');


module.exports = {
  ensureUser(req, res, next) {
    if (req.user !== undefined) {
      return next();
    }
    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
      '403', req.referer, 'AccountController.ensureOwner', 'Unauthorized user(user not logged in'));
    return res.status(403).send('You are not authorized for this');
  },

  ensureRole: function ensureRole(type) {
    return function checkUser(req, res, next) {
      if (req.user.type === type) {
        return next();
      }
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        '403', req.referer, 'AccountController.editBusinessUser', 'Unauthorized role'));
      return res.status(403).send('You are not authorized for this');
    };
  },

  ensureOwner(req, res, next) {
    if (req.user._id === req.params.id) {
      return next();
    }
    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
      '403', req.referer, 'AccountController.ensureOwner', 'Unauthorized owner'));
    return res.status(403).send('You are not authorized for this');
  },

  ensureIsOwner: function ensureIsOwner(model, migrant, business, admin) {
    return async function checkOwner(req, res, next) {
      const item = await model.findOne({ _id: req.params.id });
      const user = await User.findOne({ _id: req.user._id });
      if (user) {
        if ((migrant && user.type === UserTypes.MIGRANT)
        || (business && user.type === UserTypes.BUSINESS)) {
          if ((item.email !== undefined && req.user._id !== item.email)
          || (item.user !== undefined && req.user._id !== item.user)) {
            return res.status(400).send('You cannot modify this item.');
          }
        } else if ((admin && user.type !== UserTypes.ADMIN)) {
          return res.status(400).send('You cannot modify this item.');
        }
      } else {
        return res.status(400).send('Please log out and log back in.');
      }
      return next();
    };
  },
};
