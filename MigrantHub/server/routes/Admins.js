const express = require('express');

const router = express.Router();
const AdminController = require('../controllers/AdminController');


router.get('/', AdminController.getAdmins);
router.get('/deleted', AdminController.getDeletedAdmins);
router.get('/rejected', AdminController.getRejectedAdmins);
router.get('/unapproved', AdminController.getUnapprovedAdmins);
router.put('/:id/reactivate', AdminController.reactivateAdmin);
router.put('/:id/approve', AdminController.approveAdmin);
router.put('/:id/reject', AdminController.rejectAdmin);
router.delete('/:id', AdminController.deleteAdmin);

module.exports = router;
