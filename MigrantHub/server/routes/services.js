var express = require('express');
var router = express.Router();
var servicesController = require('../controllers/servicesController');

router.post('/create', servicesController.upload.single('serviceImage'), servicesController.createService);
router.post('/update', servicesController.upload.single('serviceImage'), servicesController.updateService);
router.delete('/:id', servicesController.deleteService);
router.get('/view/all/', servicesController.viewServices);
router.get('/get/', servicesController.getServiceData);

module.exports = router;