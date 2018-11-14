const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const EventValidator = require('../validators/EventValidator');
const Event = require('../models/Event');
const { logger, formatMessage } = require('../config/winston');

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

  createEvent(req, res) {
    const parsedObj = qs.parse(req.body.eventDetails);
    const date = new Date();
    const errors = EventValidator(parsedObj);

    if (errors === '') {
      const event = new Event();

      event.creator = req.user._id;
      event.visibility = parsedObj.visibility;
      event.eventName = parsedObj.eventName;
      event.description = parsedObj.description;
      event.location = parsedObj.location;
      event.dateStart = parsedObj.dateStart;
      event.dateEnd = parsedObj.dateEnd;
      event.timeStart = parsedObj.timeStart;
      event.secondsStart = parsedObj.secondsStart;
      event.timeEnd = parsedObj.timeEnd;
      event.repeat = parsedObj.repeat;
      event.secondsEnd = parsedObj.secondsEnd;
      if (parsedObj.eventImageName === 'cameraDefault.png') {
        event.eventImagePath = (`../uploads/default/${parsedObj.eventImageName}`);
      } else {
        event.eventImagePath = (`../uploads/${req.user._id}/events/${parsedObj.eventImageName}`);
      }
      event.dateCreated = date;
      event.save((err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer, 'eventController.createEvent', err.message));
          return res.status(400).send('There was a error creating event.');
        }
        return res.status(200).send('Event has been created!');
      });
    } else {
      logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
        '500', req.referer, 'eventController.createEvent: CreateEventValidator', errors));
      return res.status(400).send('There was a error creating event.');
    }
  },

  getEventData(req, res) {
    const query = {};

    if (req.query._id !== '') {
      query._id = req.query._id;
      query.deleted = false;
    }

    Event.findOne(query, (err, events) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'eventController.getEventData', err.message));
        return res.status(400).send('There was a error getting event.');
      }
      return res.status(200).send(events);
    });
  },

  viewEvents(req, res) {
    const query = {};

    if (req.query.editOwner !== '') {
      query.creator = req.query.editOwner;
    }
    query.deleted = false;
    Event.find(query, (err, events) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'eventController.viewEvents', err.message));
        res.status(400).send('There was a error getting events.');
      } else {
        res.status(200).send(events);
      }
    });
  },

  updateEvent(req, res) {
    let updateError = false;

    const parsedObj = qs.parse(req.body.eventDetails);
    const errors = EventValidator(parsedObj);

    if (errors === '') {
      if (parsedObj.location === undefined) {
        parsedObj.location = {};
      }

      if ((parsedObj.eventImagePath !== undefined) && (parsedObj.eventImagePath !== (`../uploads/${req.user._id}/events/${parsedObj.eventImageName}`))) {
        fs.remove(`${parsedObj.eventImagePath.toString().substring(3)}`, (err) => {
          if (err) {
            logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
              err.status, req.referer, 'eventController.updateEvent: remove image', err.message));
            updateError = true;
          }
        });
      }

      if (parsedObj.eventImageName === 'cameraDefault.png') {
        parsedObj.eventImagePath = (`../uploads/default/${parsedObj.eventImageName}`);
      } else {
        parsedObj.eventImagePath = (`../uploads/${req.user._id}/events/${parsedObj.eventImageName}`);
      }

      Event.findByIdAndUpdate({ _id: parsedObj._id }, parsedObj, { new: true }, (err) => {
        if (err) {
          logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
            err.status, req.referer, 'eventController.updateEvent', err.message));
          updateError = true;
        }
      });

      if (updateError) {
        return res.status(400).send('There was an error updating event.');
      }
      return res.status(200).send('Event updated successfully.');
    }
    logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
      '500', req.referer, 'eventController.updateEvent: remove image', errors));
    return res.status(400).send('There was an error updating Event.');
  },
  deleteEvent(req, res) {
    let deleteError = false;
    Event.updateOne({ _id: req.params.id }, { deleted: true, deletedDate: Date.now() }, (err) => {
      if (err) {
        logger.error(formatMessage(req.ip, req.method, req.originalUrl, req.httpVersion,
          err.status, req.referer, 'eventController.deleteEvent', err.message));
        deleteError = true;
      }
    });

    if (deleteError) {
      res.status(400).send('There was an error deleting event.');
    } else {
      res.status(200).send('Event deleted successfully.');
    }
  },
};
