const express = require('express');

const router = express.Router();
const EventController = require('../controllers/EventController');
const { ensureIsOwner } = require('../middleware/AuthMiddleware');
const Event = require('../models/Event');

router.get('/', EventController.viewEvents);
router.get('/:id', EventController.getEventData);
router.post('/', EventController.upload.single('eventImage'), EventController.createEvent);
router.put('/:id', ensureIsOwner(Event, true, true, true), EventController.upload.single('eventImage'), EventController.updateEvent);
router.delete('/:id', ensureIsOwner(Event, true, true, true), EventController.deleteEvent);

module.exports = router;
