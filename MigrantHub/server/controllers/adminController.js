const Admin = require('../models/Admin');
const { logger, formatMessage } = require('../config/winston');

module.exports = {
  getAdmins(req, res) {
    Admin.find({ authorized: true, rejected: false, deleted: false }, 'email', (err, users) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'adminController.getAdmins' , err.message));
        res.status(500).send('There was an error finding admins');
      } else {
        res.status(200).send(users);
      }
    });
  },

  getDeletedAdmins(req, res) {
    Admin.find({ deleted: true }, 'email', (err, users) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'adminController.getDeletedAdmins' , err.message));
        res.status(500).send('There was an error finding deleted admins');
      } else {
        res.status(200).send(users);
      }
    });
  },

  getRejectedAdmins(req, res) {
    Admin.find({ authorized: false, rejected: true }, 'email', (err, users) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'adminController.getRejectedAdmins' , err.message));
        res.status(500).send('There was an error finding rejected admins');
      } else {
        res.status(200).send(users);
      }
    });
  },

  getUnapprovedAdmins(req, res) {
    Admin.find({ authorized: false, rejected: false, deleted: false }, 'email', (err, users) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'adminController.getUnapprovedAdmins' , err.message));
        res.status(500).send('There was an error finding unnaproved admins');
      } else {
        res.status(200).send(users);
      }
    });
  },

  reactivateAdmin(req, res) {
    Admin.updateOne({ _id: req.params.id }, { deleted: false, deletedDate: null }, (err) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'adminController.reactivateAdmin' , err.message));
        res.status(500).send('There was an error reactivating admin.');
      } else {
        res.status(200).send('Admin reactivated successfully.');
      }
    });
  },

  approveAdmin(req, res) {
    Admin.updateOne({ _id: req.params.id },
      { authorized: true, rejected: false, rejectedDate: null }, (err) => {
        if (err) {
            logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
                err.status, req.referer,'adminController.approveAdmin' , err.message));
          res.status(500).send('There was an error approving admin.');
        } else {
          res.status(200).send('Admin approved successfully.');
        }
      });
  },

  rejectAdmin(req, res) {
    Admin.updateOne({ _id: req.params.id }, { rejected: true, rejectedDate: Date.now() }, (err) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'accountController.rejectAdmin' , err.message));
        res.status(500).send('There was an error rejecting admin.');
      } else {
        res.status(200).send('Admin rejected successfully.');
      }
    });
  },

  deleteAdmin(req, res) {
    Admin.updateOne({ _id: req.params.id }, { deleted: true, deletedDate: Date.now() }, (err) => {
      if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer,'adminController.deleteAdmin' , err.message));
        res.status(500).send('There was an error deleting admin.');
      } else {
        res.status(200).send('Admin deleted successfully.');
      }
    });
  },
};
