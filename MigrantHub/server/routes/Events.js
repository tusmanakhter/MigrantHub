const express = require('express');

const router = express.Router();
const EventController = require('../controllers/EventController');
const { ensureUser } = require('../middleware/AuthMiddleware');
const { controllerHandler } = require('../controllers/ControllerUtils');

router.post('/create', EventController.upload.single('eventImage'),
  controllerHandler(EventController.createEvent,
    req => [req.user, req.body.eventDetails]));
router.post('/update', ensureUser, EventController.upload.single('eventImage'),
  controllerHandler(EventController.updateEvent, req => [req.user, req.body.eventDetails]));
router.delete('/:id', ensureUser, controllerHandler(EventController.deleteEvent, req => [req.params.id]));
router.get('/view/all/', controllerHandler(EventController.getEvents, req => [req.query.editOwner]));
router.get('/get/', controllerHandler(EventController.getEvent, req => [req.query._id]));

module.exports = router;
