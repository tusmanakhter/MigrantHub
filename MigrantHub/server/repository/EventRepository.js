const Event = require('../models/Event');

module.exports = {

  createEvent(eventOwner, eventObject) {
    const event = new Event();
    event.creator = eventOwner;
    event.visibility = eventObject.visibility;
    event.eventName = eventObject.eventName;
    event.description = eventObject.description;
    event.location = eventObject.location;
    event.dateStart = eventObject.dateStart;
    event.dateEnd = eventObject.dateEnd;
    event.timeStart = eventObject.timeStart;
    event.secondsStart = eventObject.secondsStart;
    event.timeEnd = eventObject.timeEnd;
    event.repeat = eventObject.repeat;
    event.secondsEnd = eventObject.secondsEnd;
    event.eventImagePath = eventObject.eventImagePath;
    event.dateCreated = eventObject.dateCreated;
    event.save((err) => {
      if (err) {
        throw new Error('There was an error saving event.');
      } else {
        return Promise.resolve('Event has been created.');
      }
    });
  },

  getEvent(query) {
    return Event.findOne(query).exec().then(event => Promise.resolve(event)).catch(() => {
      throw new Error('There was an error retrieving event.');
    });
  },

  getEvents(query) {
    return Event.find(query).exec().then(events => Promise.resolve(events)).catch(() => {
      throw new Error('There was an error retrieving events.');
    });
  },

  updateEvent(eventObject) {
    return Event.findByIdAndUpdate({ _id: eventObject._id }, eventObject,
      { new: true }).exec()
      .then(() => Promise.resolve('Event has been updated.')).catch(() => {
        throw new Error('There was an error updating event in db.');
      });
  },

  deleteEvent(eventId) {
    return Event.updateOne({ _id: eventId }, {
      deleted: true,
      deletedDate: Date.now(),
    }).exec().then(() => Promise.resolve('Event has been deleted.')).catch(() => {
      throw new Error('There was an error deleting event.');
    });
  },
};
