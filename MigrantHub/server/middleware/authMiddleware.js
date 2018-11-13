const { logger, formatMessage } = require('../config/winston');

module.exports = {
  ensureUser(req, res, next) {
    if (req.user !== undefined) {
      return next();
    }
    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        '403' , req.referer,'accountController.ensureOwner', 'Unauthorized user(user not logged in'));
    return res.status(403).send('You are not authorized for this');
  },

  ensureRole: function ensureRole(type) {
    return function checkUser(req, res, next) {
      if (req.user.type === type) {
        return next();
      }
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          '403', req.referer,'accountController.editBusinessUser' , 'Unauthorized role'));
      return res.status(403).send('You are not authorized for this');
    };
  },

  ensureOwner(req, res, next) {
    if (req.user._id === req.params.id) {
      return next();
    }
    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        '403', req.referer,'accountController.ensureOwner' ,'Unauthorized owner'));
    return res.status(403).send('You are not authorized for this');
  },
};
