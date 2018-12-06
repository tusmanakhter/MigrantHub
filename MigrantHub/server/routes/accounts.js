const express = require('express');

const router = express.Router();
const passport = require('passport');
const accountController = require('../controllers/accountController');

router.get('/', accountController.getUser);
router.post('/create/user', accountController.createUser);
router.post('/create/business', accountController.createBusiness);
router.post('/create/admin', accountController.createAdmin);
router.get('/get/user', accountController.getUserType);

router.post('/login', (req, res, next) => { next(); }, passport.authenticate('local'), (req, res) => {
  const user = {
    _id: req.user._id,
    type: req.user.type,
  };
  res.send(user);
});

router.post('/auth/facebook', passport.authenticate('facebook-token'), (req, res) => {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
    id: req.user.id,
  };
  const user = {
    _id: req.user._id,
    type: req.user.type,
  };
  res.send(user);
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

module.exports = router;
