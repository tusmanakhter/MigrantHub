var Admin = require('../models/Admin');

module.exports = {
  getAdmins: function(req, res) {
    Admin.find({ authorized: true, rejected: false, deleted: false }, 'email', function (err, users) {
      if (err) {
        res.status(500).send("There was an error finding admins");
      } else {
        res.status(200).send(users);
      }
    });
  },

  getDeletedAdmins: function(req, res) {
    Admin.find({ deleted: true }, 'email', function (err, users) {
      if (err) {
        res.status(500).send("There was an error finding deleted admins");
      } else {
        res.status(200).send(users);
      }
    });
  },

  getRejectedAdmins: function(req, res) {
    Admin.find({ authorized: false, rejected: true }, 'email', function (err, users) {
      if (err) {
        res.status(500).send("There was an error finding rejected admins");
      } else {
        res.status(200).send(users);
      }
    });
  },

  getUnapprovedAdmins: function(req, res) {
    Admin.find({ authorized: false, rejected: false, deleted: false }, 'email', function (err, users) {
      if (err) {
        res.status(500).send("There was an error finding unnaproved admins");
      } else {
        res.status(200).send(users);
      }
    });
  },

  reactivateAdmin: function(req, res) {
    Admin.updateOne({ _id: req.params.id }, { deleted: false, deletedDate: null }, function (err) {
      if (err) {
        res.status(500).send("There was an error reactivating admin.");
      } else {
        res.status(200).send("Admin reactivated successfully.");
      }
    });
  },

  approveAdmin: function(req, res) {
    Admin.updateOne({ _id: req.params.id }, { authorized: true, rejected: false, rejectedDate: null }, function (err) {
      if (err) {
        res.status(500).send("There was an error approving admin.");
      } else {
        res.status(200).send("Admin approved successfully.");
      }
    });
  },

  rejectAdmin: function(req, res) {
    Admin.updateOne({ _id: req.params.id }, { rejected: true, rejectedDate: Date.now() }, function (err) {
      if (err) {
        res.status(500).send("There was an error rejecting admin.");
      } else {
        res.status(200).send("Admin rejected successfully.");
      }
    });
  },

  deleteAdmin: function(req, res) {
    Admin.updateOne({ _id: req.params.id }, { deleted: true, deletedDate: Date.now() }, function (err) {
      if (err) {
        res.status(500).send("There was an error deleting admin.");
      } else {
        res.status(200).send("Admin deleted successfully.");
      }
    });
  }
};