const express = require('express');

const router = express.Router();
const EventController = require('../controllers/EventController');
const { ensureUser } = require('../middleware/AuthMiddleware');


router.post('/create', EventController.upload.single('eventImage'), EventController.createEvent);
router.post('/update', ensureUser, EventController.upload.single('eventImage'), EventController.updateEvent);
router.delete('/:id', ensureUser, EventController.deleteEvent);
router.get('/view/all/', EventController.viewEvents);
router.get('/get/', EventController.getEventData);

module.exports = router;
