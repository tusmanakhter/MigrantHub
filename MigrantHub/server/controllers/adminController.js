const Admin = require('../models/Admin');

module.exports = {
  getUnapprovedAdmins(req, res) {
    Admin.find({ authorized: false }, 'email', (err, users) => {
      if (err) {
        return res.send('There was an error finding unnaproved admins');
      }
      return res.send(users);
    });
  },
};
