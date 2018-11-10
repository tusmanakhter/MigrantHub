const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const CreateEventValidator = require('../validators/CreateEventValidator');
const Event = require('../models/Event');

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(req.session);
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
    const errors = CreateEventValidator(parsedObj);

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
        event.eventImagePath = (`/default/${parsedObj.eventImageName}`);
      } else {
        event.eventImagePath = (`${req.user._id}/events/${parsedObj.eventImageName}`);
      }
      event.dateCreated = date;
      event.save((err) => {
        if (err) {
          return res.status(400).send('There was a error creating event.');
        }
        return res.status(200).send('Event has been created!');
      });
    } else {
      return res.status(400).send('There was a error creating event.');
    }
  },

  getEventData(req, res) {
    const query = {};

    if (req.query._id !== '') {
      query["_id"]= req.query._id;
      query["deleted"] = false;
    }

    Event.findOne(query, (err, events) => {
      console.log(events);
      if (err) {
        return res.status(400).send('There was a error getting event.');
      }
      return res.status(200).send(events);
    });
  },

  viewEvents(req, res) {
    let query ={};

    if(req.query.editOwner !== '') {
        console.log("EditOwner" + req.query.editOwner);
        query["email"] = req.query.editOwner;
    }
    query["deleted"] = false;
    Event.find({}, (err, events) => res.send(events));
  },

  updateEvent(req, res) {
    let updateError = false;

    const parsedObj = qs.parse(req.body.eventDetails);
    const errors = CreateEventValidator(parsedObj);

    if (errors === '') {
      if (parsedObj.location === undefined) {
        parsedObj.location = {};
      }

      if ((parsedObj.eventImagePath !== undefined) && (parsedObj.eventImagePath !== (`../${req.user._id}/events/${parsedObj.eventImageName}`))) {
        fs.remove(`uploads/${parsedObj.eventImagePath.toString().substring(3)}`, (err) => {
          if (err) {
            updateError = true;
          }
        });
      }

      if (parsedObj.eventImageName === 'cameraDefault.png') {
        parsedObj.eventImageName = (`../default/${parsedObj.eventImageName}`);
      } else {
        parsedObj.eventImagePath = (`../${req.user._id}/events/${parsedObj.eventImageName}`);
      }

      Event.findByIdAndUpdate({ _id: parsedObj._id }, parsedObj, { new: true }, (err) => {
        if (err) {
          updateError = true;
        }
      });

      if (updateError) {
        return res.status(400).send('There was an error updating event.');
      }
      return res.status(200).send('Event updated successfully.');
    }
    return res.status(400).send('There was an error updating Event.');
  },
    deleteEvent: function(req, res) {   
      let deleteError = false;
      Event.updateOne({_id: req.params.id}, { deleted: true, deletedDate: Date.now() }, (err) => {
              if (err) {
                  deleteError = true;
              }
          }
      );

      if (deleteError) {
          return res.status(400).send("There was an error deleting event.");
      } else {
          return res.status(200).send("Event deleted successfully.");
      }
  },
};
