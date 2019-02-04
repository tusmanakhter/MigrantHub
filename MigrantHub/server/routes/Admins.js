const express = require('express');

const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/', controllerHandler(AdminController.getAdmins, req => [req.user]));
router.get('/all', controllerHandler(AdminController.getAllAdmins, () => []));
router.get('/deleted', controllerHandler(AdminController.getDeletedAdmins, () => []));
router.get('/rejected', controllerHandler(AdminController.getRejectedAdmins, () => []));
router.get('/unapproved', controllerHandler(AdminController.getUnapprovedAdmins, () => []));
router.put('/:id/reactivate', controllerHandler(AdminController.reactivateAdmin, req => [req.params.id]));
router.put('/:id/approve', controllerHandler(AdminController.approveAdmin, req => [req.params.id]));
router.put('/:id/reject', controllerHandler(AdminController.rejectAdmin, req => [req.params.id]));
router.delete('/:id', controllerHandler(AdminController.deleteAdmin, req => [req.user, req.params.id]));

module.exports = router;
