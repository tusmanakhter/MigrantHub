var express = require('express');
var router = express.Router();
var passport = require('passport')
var friendController = require('../controllers/friendController')

router.post('/acceptFriendRequest', friendController.acceptFriendRequest);
router.post('/rejectFriendRequest', friendController.rejectFriendRequest);
router.get('/getFriendsList', friendController.getFriendsList);

module.exports = router;