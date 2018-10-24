var express = require('express');
var router = express.Router();
var passport = require('passport')
var eventController = require('../controllers/eventController')

router.post('/create', eventController.createEvent);
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