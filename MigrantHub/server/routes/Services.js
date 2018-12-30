const express = require('express');

const router = express.Router();
const ServiceController = require('../controllers/ServiceController');
const { controllerHandler } = require('../controllers/ControllerUtils');
const { ensureIsOwner } = require('../middleware/AuthMiddleware');
const Service = require('../models/Service');

router.use('/:id/reviews', require('./Reviews'));

router.get('/', controllerHandler(ServiceController.getServices, req => [req.query.editOwner, req.query.searchQuery, req.query.search, req.query.category, req.query.subcategory]));
router.get('/:id', controllerHandler(ServiceController.getService, req => [req.query._id]));
router.post('/', ServiceController.upload.single('serviceImage'),
  controllerHandler(ServiceController.createService, req => [req.user, req.body.serviceDetails]));
router.put('/:id', ensureIsOwner(Service, true, true, true), ServiceController.upload.single('serviceImage'),
  controllerHandler(ServiceController.updateService, req => [req.user, req.body.serviceDetails]));
router.delete('/:id', ensureIsOwner(Service, true, true, true), controllerHandler(ServiceController.deleteService, req => [req.params.id]));

module.exports = router;
