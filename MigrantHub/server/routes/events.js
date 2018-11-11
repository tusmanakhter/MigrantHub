const express = require('express');

const router = express.Router();
const eventController = require('../controllers/eventController');
const accountController = require('../controllers/accountController');


router.post('/create', eventController.upload.single('eventImage'), eventController.createEvent);
router.post('/update', accountController.ensureUser, eventController.upload.single('eventImage'), eventController.updateEvent);
router.delete('/:id', accountController.ensureUser, eventController.deleteEvent);
router.get('/view/all/', eventController.viewEvents);
router.get('/get/', eventController.getEventData);

module.exports = router;
