const express = require('express');

const router = express.Router();
const eventController = require('../controllers/eventController');
const { ensureUser } = require('../middleware/authMiddleware');


router.post('/create', eventController.upload.single('eventImage'), eventController.createEvent);
router.post('/update', ensureUser, eventController.upload.single('eventImage'), eventController.updateEvent);
router.delete('/:id', ensureUser, eventController.deleteEvent);
router.get('/view/all/', eventController.viewEvents);
router.get('/get/', eventController.getEventData);

module.exports = router;
