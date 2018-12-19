const express = require('express');

const router = express.Router();
const AdminController = require('../controllers/AdminController');
const EventController = require('../controllers/EventController');


router.get('/', AdminController.getAdmins);
router.get('/deleted', AdminController.getDeletedAdmins);
router.get('/rejected', AdminController.getRejectedAdmins);
router.get('/unapproved', AdminController.getUnapprovedAdmins);
router.put('/:id/reactivate', AdminController.reactivateAdmin);
router.put('/:id/approve', AdminController.approveAdmin);
router.put('/:id/reject', AdminController.rejectAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.delete('/event/:id', EventController.deleteEvent);

module.exports = router;
