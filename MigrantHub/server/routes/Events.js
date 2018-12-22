const express = require('express');

const router = express.Router();
const EventController = require('../controllers/EventController');
const { ensureUser, ensureIsOwner } = require('../middleware/AuthMiddleware');
const Events = require('../models/Event');

router.post('/create', EventController.upload.single('eventImage'), EventController.createEvent);
router.post('/update', ensureUser, EventController.upload.single('eventImage'), EventController.updateEvent);
router.delete('/:id', ensureIsOwner(Events, true, true, true), EventController.deleteEvent);
router.get('/view/all/', EventController.viewEvents);
router.get('/get/', EventController.getEventData);

module.exports = router;
