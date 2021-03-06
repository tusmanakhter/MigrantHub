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

  async getEvents(user, userId, searchQuery, search, offset, limit, filtered) {
    return EventService.getEvents(user, userId, searchQuery, search, offset, limit, filtered);
  },

  async getEvent(user, eventId) {
    return EventService.getEvent(user, eventId);
  },

  async updateEvent(user, eventObject) {
    const parsedEventObject = qs.parse(eventObject);
    return EventService.updateEvent(user, parsedEventObject);
  },

  async deleteEvent(eventId) {
    return EventService.deleteEvent(eventId);
  },
};
