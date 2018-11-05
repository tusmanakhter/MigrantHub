var Event = require('../models/Event');
var CreateEventValidator = require('../validators/CreateEventValidator');
var qs = require('qs');
var multer  = require('multer')
let fs = require('fs-extra');

var multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.session);
        let path = 'uploads/' + req.session.passport.user._id + '/events/';
        fs.ensureDirSync(path);
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
});

module.exports = {

    upload : multer({ storage: multerStorage }),

    createEvent: function(req, res) {
        let parsedObj = qs.parse(req.body);
        let errors = CreateEventValidator(parsedObj);
      
        if (errors == "") {
            let event = new Event();

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
            if(parsedObj.eventImageName === 'cameraDefault.png'){
            event.eventImagePath = ('/default/' +parsedObj.eventImageName);
            }else{
                event.eventImagePath = (req.user._id + "/events/" + parsedObj.eventImageName);
            }

            event.save(function (err) {
            if (err) {
                res.send("There was a error saving event.");
                // Todo: Should create with error
                console.log(err)
            } else {
                res.send('Event has been added!');
            }
            });
        } else {
        res.send(errors);
        }
    },

    viewEvents: function (req, res) {
        Event.find({}, function(err, events) {
            res.send(events);
        });
    }
};