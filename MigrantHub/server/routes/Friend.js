const express = require('express');

const router = express.Router();
const FriendController = require('../controllers/FriendController');

router.post('/add', FriendController.addFriend);
router.post('/acceptfriendrequest', FriendController.acceptFriendRequest);
router.post('/rejectfriendrequest', FriendController.rejectFriendRequest);
router.post('/unfriend', FriendController.unfriend);
router.get('/getrequests', FriendController.getFriendRequests);
router.get('/getfriendslist', FriendController.getFriendsList);
router.get('/viewusers', FriendController.viewUsers);

module.exports = router;
