var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController')


router.get('/accounts/unapproved', adminController.getUnapprovedAdmins);
router.put('/:id/approve', adminController.approveAdmin);
router.put('/:id/reject', adminController.rejectAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;