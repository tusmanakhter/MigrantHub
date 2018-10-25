var express = require('express');
var router = express.Router();
var servicesController = require('../controllers/servicesController');

router.post('/create', servicesController.createService);

module.exports = router;