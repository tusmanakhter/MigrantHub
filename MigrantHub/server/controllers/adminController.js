var Admin = require('../models/Admin');

module.exports = {
  getUnapprovedAdmins: function(req, res) {
    Admin.find({ authorized: false }, 'email', function (err, users) {
      if (err) {
        res.send("There was an error finding unnaproved admins");
      } else {
        res.send(users);
      }
    });
  },

  approveAdmin: function(req, res) {
    Admin.updateOne({ _id: req.params.id }, { authorized: "true" }, function (err) {
      if (err) {
        res.status(400).send("There was an error approving admin.");
      } else {
        res.status(200).send("Admin approved succesfully.");
      }
    });
  },

  rejectAdmin: function(req, res) {
    Admin.updateOne({ _id: req.params.id }, { rejected: "true", rejectedDate: Date.now() }, function (err) {
      if (err) {
        res.status(400).send("There was an error rejecting admin.");
      } else {
        res.status(200).send("Admin rejected succesfully.");
      }
    });
  },

  deleteAdmin: function(req, res) {
    Admin.updateOne({ _id: req.params.id }, { deleted: "true", deletedDate: Date.now() }, function (err) {
      if (err) {
        res.status(400).send("There was an error deleting admin.");
      } else {
        res.status(200).send("Admin deleted succesfully.");
      }
    });
  }
};