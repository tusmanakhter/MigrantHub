const express = require('express');

const router = express.Router();
const adminController = require('../controllers/adminController');
const servicesController = require('../controllers/ServicesController');
const eventController = require('../controllers/eventController');


router.get('/', adminController.getAdmins);
router.get('/deleted', adminController.getDeletedAdmins);
router.get('/rejected', adminController.getRejectedAdmins);
router.get('/unapproved', adminController.getUnapprovedAdmins);
router.put('/:id/reactivate', adminController.reactivateAdmin);
router.put('/:id/approve', adminController.approveAdmin);
router.put('/:id/reject', adminController.rejectAdmin);
router.delete('/:id', adminController.deleteAdmin);
router.delete('/services/:id', servicesController.deleteService);
router.delete('/event/:id', eventController.deleteEvent);

module.exports = router;
