const express = require('express');

const router = express.Router();
const servicesController = require('../controllers/ServicesController');

router.post('/create', servicesController.upload.single('serviceImage'), servicesController.createService);
router.post('/update', servicesController.upload.single('serviceImage'), servicesController.updateService);
router.delete('/:id', servicesController.deleteService);
router.get('/view/all/', servicesController.viewServices);
router.get('/get/', servicesController.getServiceData);

module.exports = router;
