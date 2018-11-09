const express = require('express');

const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/create', eventController.upload.single('eventImage'), eventController.createEvent);
router.get('/view/all', eventController.viewEvents);

module.exports = router;
