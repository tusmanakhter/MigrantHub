const express = require('express');
const { ensureOwner } = require('../middleware/AuthMiddleware');
const BusinessController = require('../controllers/BusinessController');
const router = express.Router();
const { controllerHandler } = require('../controllers/ControllerUtils');

router.get('/:id', ensureOwner, controllerHandler(BusinessController.getBusinessUser, req => [req.user._id]));
router.put('/:id', ensureOwner, controllerHandler(BusinessController.editBusinessUser, req => [req.user._id, req.body]));

module.exports = router;
