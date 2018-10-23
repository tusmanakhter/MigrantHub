var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController')


router.get('/accounts/unapproved', adminController.getUnapprovedAdmins);

module.exports = router;