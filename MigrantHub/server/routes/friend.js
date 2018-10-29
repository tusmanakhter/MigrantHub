var express = require('express');
var router = express.Router();
var friendController = require('../controllers/friendController')

router.post('/add', friendController.addFriend);
router.post('/acceptFriendRequest', friendController.acceptFriendRequest);
router.post('/rejectFriendRequest', friendController.rejectFriendRequest);
router.get('/getRequests', friendController.getFriendRequests);
router.get('/getFriendsList', friendController.getFriendsList);

module.exports = router;