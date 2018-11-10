const express = require('express');

const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/create', eventController.upload.single('eventImage'), eventController.createEvent);
router.post('/update', eventController.upload.single('eventImage'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/view/all/', eventController.viewEvents);
router.get('/get/', eventController.getEventData);

module.exports = router;
