const express = require('express');

const router = express.Router();
const servicesController = require('../controllers/ServicesController');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.post('/create', servicesController.upload.single('serviceImage'),
  controllerHandler(servicesController.createService,
    req => [req.user, req.body.serviceDetails]));
router.post('/update', servicesController.upload.single('serviceImage'),
  controllerHandler(servicesController.updateService, req => [req.user, req.body.serviceDetails]));
router.post('/review', servicesController.createServiceReview);
router.get('/reviews', servicesController.getServiceReviews);
router.delete('/review/:id', servicesController.deleteReview);
router.delete('/:id', controllerHandler(servicesController.deleteService, req => [req.user, req.params.id]));
router.get('/view/all/', controllerHandler(servicesController.getServices, req => [req.query.editOwner, req.query.searchQuery, req.query.search]));
router.get('/get/', controllerHandler(servicesController.getService, req => [req.query._id]));

module.exports = router;
