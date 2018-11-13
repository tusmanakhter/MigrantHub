const qs = require('qs');
const MigrantUser = require('../models/MigrantUser');
const { logger, formatMessage } = require('../config/winston');

module.exports = {
  getMigrantUser(req, res) {
    const email = req.user._id;
    MigrantUser.findOne({ email }, (err, user) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer, 'accountController.getMigrantUser', err.message));
          return res.status(500).send(err);
        return res.status(500).send(err);
      } if (!user) {
        return res.status(500).send('Incorrect email');
      }
      return res.status(200).send(user);
    });
  },

  editMigrantUser(req, res) {
    const parsedObj = qs.parse(req.body);

    if (parsedObj.languages === undefined) {
      parsedObj.languages = [];
    }

    if (parsedObj.workExperience === undefined) {
      parsedObj.workExperience = [];
    }

    if (parsedObj.family === undefined) {
      parsedObj.family = [];
    }

    MigrantUser.findByIdAndUpdate(
      req.user._id,
      parsedObj,
      { new: true },
      (err) => {
        // Handle any possible database errors
        if (err) {
            logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                err.status, req.referer,'accountController.editMigrantUser' , err.message));
          return res.status(500).send(err);
        }else {
            return res.send('Updated Migrant User');
        }
      },
    );
  },
};
