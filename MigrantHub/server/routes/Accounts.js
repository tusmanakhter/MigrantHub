const express = require('express');

const router = express.Router();
const passport = require('passport');
const AccountController = require('../controllers/AccountController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/', controllerHandler(AccountController.getUser, req => [req.user]));
router.get('/get/user', controllerHandler(AccountController.getUserType, req => [req.user]));
router.post('/create/user', controllerHandler(AccountController.createUser, req => [req.body]));
router.post('/create/business', controllerHandler(AccountController.createBusiness, req => [req.body]));
router.post('/create/admin', controllerHandler(AccountController.createAdmin, req => [req.body]));

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

router.post('/auth/google', passport.authenticate('google-token'), (req, res) => {
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
