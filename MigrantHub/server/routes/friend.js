var express = require('express');
var router = express.Router();
var friendController = require('../controllers/friendController')

router.post('/add', friendController.addFriend);

module.exports = router;