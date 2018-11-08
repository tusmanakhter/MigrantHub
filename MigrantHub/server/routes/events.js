var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController')

router.post('/create', eventController.upload.single('eventImage'), eventController.createEvent);
router.get('/view/all', eventController.viewEvents);

module.exports = router;