const express = require('express');

const router = express.Router();
const ServiceController = require('../controllers/ServiceController');
const { ensureRole, ensureIsOwner } = require('../middleware/AuthMiddleware');
const Service = require('../models/Service');
const ReviewService = require('../models/ReviewService');

router.get('/', ServiceController.viewServices);
router.get('/:id', ServiceController.getServiceData);
router.post('/', ServiceController.upload.single('serviceImage'), ServiceController.createService);
router.put('/:id', ensureIsOwner(Service, true, true, true), ServiceController.upload.single('serviceImage'), ServiceController.updateService);
router.delete('/:id', ensureIsOwner(Service, true, true, true), ServiceController.deleteService);

router.post('/review', ensureRole('migrant'), ServiceController.createServiceReview);
router.get('/reviews', ServiceController.getServiceReviews);
router.delete('/review/:id', ensureIsOwner(ReviewService, true, false, true), ServiceController.deleteReview);

module.exports = router;
