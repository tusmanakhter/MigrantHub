const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const EventService = require('../service/EventService');

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    const path = `uploads/${req.session.passport.user._id}/events/`;
    fs.ensureDirSync(path);
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = {

  upload: multer({ storage: multerStorage }),

  async createEvent(user, eventObject) {
    const parsedEventObj = qs.parse(eventObject);
    return EventService.createEvent(user, parsedEventObj);
  },

  async getEvents(userId, searchQuery, search, offset, limit) {
    return EventService.getEvents(userId, searchQuery, search, offset, limit);
  },

  async getEvent(eventId) {
    return EventService.getEvent(eventId);
  },

  async updateEvent(user, eventObject) {
    const parsedEventObject = qs.parse(eventObject);
    return EventService.updateEvent(user, parsedEventObject);
  },

  async deleteEvent(eventId) {
    return EventService.deleteEvent(eventId);
  },
};
