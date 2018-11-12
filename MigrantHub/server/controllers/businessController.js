const qs = require('qs');
const BusinessUser = require('../models/BusinessUser');


module.exports = {
  getBusinessUser(req, res) {
    const email = req.session.passport.user._id;
    BusinessUser.findOne({ email }, (err, user) => {
      if (err) {
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
      req.session.passport.user._id,
      parsedObj,
      { new: true },
      (err) => {
        // Handle any possible database errors
        if (err) {
          return res.status(500).send(err);
        }
        return res.send('Updated Business User');
      },
    );
  },
};
