const express = require('express');

const router = express.Router();
const EventController = require('../controllers/EventController');
const { ensureIsOwner, ensureRole } = require('../middleware/AuthMiddleware');
const { controllerHandler } = require('../controllers/ControllerUtils');
const UserTypes = require('../lib/UserTypes');
const Event = require('../models/Event');

router.use('/saved', require('./SavedEvent'));


router.get('/', controllerHandler(EventController.getEvents, req => [req.user, req.query.editOwner, req.query.searchQuery, req.query.search, req.query.offset, req.query.limit, req.query.filtered]));
router.get('/:id', controllerHandler(EventController.getEvent, req => [req.user, req.query._id]));
router.post('/', ensureRole(UserTypes.BUSINESS), EventController.upload.single('eventImage'),
  controllerHandler(EventController.createEvent, req => [req.user, req.body.eventDetails]));
router.put('/:id', ensureIsOwner(Event, true, true, true), EventController.upload.single('eventImage'),
  controllerHandler(EventController.updateEvent, req => [req.user, req.body.eventDetails]));
router.delete('/:id', ensureIsOwner(Event, true, true, true), controllerHandler(EventController.deleteEvent, req => [req.params.id]));

module.exports = router;
