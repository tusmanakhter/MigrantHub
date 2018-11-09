var express = require('express');
var router = express.Router();
var passport = require('passport')
var accountController = require('../controllers/accountController')

router.get('/', accountController.getUser);
router.post('/create/user', accountController.createUser);
router.post('/create/business', accountController.createBusiness);
router.post('/create/admin', accountController.createAdmin);
router.post('/edit/migrantuser', accountController.editMigrantUser);
router.post('/edit/businessuser', accountController.editBusinessUser);
router.get('/get/migrantprofile', accountController.getMigrantUser);
router.get('/get/businessprofile', accountController.getBusinessUser);
router.get('/get/usertype', accountController.getUserType);

router.post('/login', function (req, res, next) {
    next()
  },
  passport.authenticate('local'),
  function (req, res) {
    var user = {
      _id: req.user._id,
      type: req.user.type
    };
    res.send(user);
})

router.post('/logout', (req, res) => {
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
})

module.exports = router;