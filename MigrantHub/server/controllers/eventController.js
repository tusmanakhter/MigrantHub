var Event = require('../models/Event');
var CreateEventValidator = require('../validators/CreateEventValidator');
var qs = require('qs');


module.exports = {
  createEvent: function(req, res) {
    let parsedObj = qs.parse(req.body);
    let errors = CreateEventValidator(parsedObj);
    
    if (errors == "") {
      let event = new Event();

      event.creator = req.user._id;
      event.visibility = parsedObj.visibility;
      event.eventName = parsedObj.eventName;
      event.description = parsedObj.description;
      event.address = parsedObj.address;
      event.apartment = parsedObj.apartment;
      event.city = parsedObj.city;
      event.province = parsedObj.province;
      event.postalCode = parsedObj.postalCode;
      event.phoneNumber = parsedObj.phoneNumber;
      event.dateStart = parsedObj.dateStart;
      event.dateEnd = parsedObj.dateEnd;
      event.timeStart = parsedObj.timeStart;
      event.secondsStart = parsedObj.secondsStart;
      event.timeEnd = parsedObj.timeEnd;
      event.repeat = parsedObj.repeat;
      event.secondsEnd = parsedObj.secondsEnd;

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
  }
};