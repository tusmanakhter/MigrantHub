var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController')


router.get('/', adminController.getAdmins);
router.get('/deleted', adminController.getDeletedAdmins);
router.get('/rejected', adminController.getRejectedAdmins);
router.get('/unapproved', adminController.getUnapprovedAdmins);
router.put('/:id/reactivate', adminController.reactivateAdmin);
router.put('/:id/approve', adminController.approveAdmin);
router.put('/:id/reject', adminController.rejectAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;