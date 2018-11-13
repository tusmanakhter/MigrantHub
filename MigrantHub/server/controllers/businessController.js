const qs = require('qs');
const BusinessUser = require('../models/BusinessUser');
const { logger, formatMessage } = require('../config/winston');

module.exports = {
  getBusinessUser(req, res) {
    const email = req.user._id;
    BusinessUser.findOne({ email }, (err, user) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'accountController.getBusinessUser' , err.message));
        return res.status(500).send(err);
      } if (!user) {
        return res.status(500).send('Incorrect email');
      }
      return res.status(200).send(user);
    });
  },

  editBusinessUser(req, res) {
    const parsedObj = qs.parse(req.body);

    BusinessUser.findByIdAndUpdate(
      req.user._id,
      parsedObj,
      { new: true },
      (err) => {
        // Handle any possible database errors
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'accountController.editBusinessUser' , err.message));
          return res.status(500).send(err);
        }
        return res.send('Updated Business User');
      },
    );
  },
};
