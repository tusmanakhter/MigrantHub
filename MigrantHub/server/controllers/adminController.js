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
  }
};