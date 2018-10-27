var express = require('express');
var router = express.Router();
var passport = require('passport')
var accountController = require('../controllers/accountController')

router.post('/create/user', accountController.createUser);
router.post('/create/business', accountController.createBusiness);
router.post('/create/admin', accountController.createAdmin);
router.post('/edit/user', accountController.editUser);
router.get('/get/profile', accountController.getUser);

router.post('/login', function (req, res, next) {
    next()
  },
  passport.authenticate('local'),
  function (req, res) {
    console.log('Logged in');
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
})

module.exports = router;