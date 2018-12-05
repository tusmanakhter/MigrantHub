const express = require('express');

const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/add', friendController.addFriend);
router.post('/acceptfriendrequest', friendController.acceptFriendRequest);
router.post('/rejectfriendrequest', friendController.rejectFriendRequest);
router.post('/unfriend', friendController.unfriend);
router.get('/getrequests', friendController.getFriendRequests);
router.get('/getfriendslist', friendController.getFriendsList);
router.get('/viewusers', friendController.viewUsers);

module.exports = router;
