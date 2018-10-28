var express = require('express');
var router = express.Router();
var friendController = require('../controllers/friendController')

router.post('/add', friendController.addFriend);
router.post('/acceptFriendRequest', friendController.acceptFriendRequest);
router.post('/rejectFriendRequest', friendController.rejectFriendRequest);
router.get('/view', friendController.viewFriends);

module.exports = router;