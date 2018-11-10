const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

router.get('/enabled', featureController.getFeatures);

module.exports = router;
