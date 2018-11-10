const express = require('express');

const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/add', friendController.addFriend);
router.post('/acceptfriendrequest', friendController.acceptFriendRequest);
router.post('/rejectfriendrequest', friendController.rejectFriendRequest);
router.get('/getrequests', friendController.getFriendRequests);
router.get('/getfriendslist', friendController.getFriendsList);

module.exports = router;
