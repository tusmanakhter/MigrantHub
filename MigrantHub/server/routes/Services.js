const express = require('express');

const router = express.Router();
const servicesController = require('../controllers/ServicesController');
const { ensureIsOwner } = require('../middleware/AuthMiddleware');
const Services = require('../models/Services');
const ReviewService = require('../models/ReviewService');

router.post('/create', servicesController.upload.single('serviceImage'), servicesController.createService);
router.post('/update', servicesController.upload.single('serviceImage'), servicesController.updateService);
router.post('/review', servicesController.createServiceReview);
router.get('/reviews', servicesController.getServiceReviews);
router.delete('/review/:id', ensureIsOwner(ReviewService, true, false, true), servicesController.deleteReview);
router.delete('/:id', ensureIsOwner(Services, true, true, true), servicesController.deleteService);
router.get('/view/all/', servicesController.viewServices);
router.get('/get/', servicesController.getServiceData);

module.exports = router;
