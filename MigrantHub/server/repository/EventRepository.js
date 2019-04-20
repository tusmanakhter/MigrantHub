const Event = require('../models/Event');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  createEvent(eventOwner, eventObject) {
    const event = new Event();
    event.user = eventOwner;
    event.visibility = eventObject.visibility;
    event.eventName = eventObject.eventName;
    event.description = eventObject.description;
    event.location = eventObject.location;
    event.dateStart = eventObject.dateStart;
    event.dateEnd = eventObject.dateEnd;
    event.timeStart = eventObject.timeStart;
    event.timeEnd = eventObject.timeEnd;
    event.repeat = eventObject.repeat;
    event.eventImagePath = eventObject.eventImagePath;
    event.dateCreated = eventObject.dateCreated;

    return event.save().then(() => Promise.resolve('Event has been created.')).catch((error) => {
      throw new ServerError('There was an error saving event.', 400, error);
    });
  },

  getEvent(query) {
    return Event.findOne(query).exec().then(event => Promise.resolve(event)).catch((error) => {
      throw new ServerError('There was an error retrieving event.', 400, error);
    });
  },

  getEvents(query, search, offset, limit, filtered) {
    if (search === 'true') {
      return Event.find(query, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } })
        .skip(parseInt(offset, 10)).limit(parseInt(limit, 10))
        .exec()
        .then(events => Promise.resolve(events))
        .catch((error) => {
          throw new ServerError('There was an error retrieving events.', 400, error);
        });
    } if (offset !== undefined && limit !== undefined) {
      if (filtered === 'true') {
        return Event.find(query).skip(parseInt(offset, 10)).limit(parseInt(limit, 10))
          .sort({ dateCreated: -1 })
          .exec()
          .then(events => Promise.resolve(events))
          .catch((error) => {
            throw new ServerError('There was an error retrieving events.', 400, error);
          });
      }
      return Event.find(query).skip(parseInt(offset, 10)).limit(parseInt(limit, 10)).exec()
        .then(events => Promise.resolve(events))
        .catch((error) => {
          throw new ServerError('There was an error retrieving events.', 400, error);
        });
    }
    return Event.find(query).exec().then(events => Promise.resolve(events))
      .catch((error) => {
        throw new ServerError('There was an error retrieving events.', 400, error);
      });
  },

  updateEvent(eventObject) {
    return Event.findByIdAndUpdate({ _id: eventObject._id }, eventObject,
      { new: true }).exec()
      .then(() => Promise.resolve('Event has been updated.')).catch((error) => {
        throw new ServerError('There was an error updating event in db.', 400, error);
      });
  },

  deleteEvent(eventId) {
    return Event.updateOne({ _id: eventId }, {
      deleted: true,
      deletedDate: Date.now(),
    }).exec().then(() => Promise.resolve('Event has been deleted.')).catch((error) => {
      throw new ServerError('There was an error deleting event.', 400, error);
    });
  },
};
