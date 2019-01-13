const fs = require('fs-extra');
const EventValidator = require('../validators/EventValidator');
const EventRepository = require('../repository/EventRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  async createEvent(user, parsedEventObject) {
    const eventObject = parsedEventObject;
    const date = new Date();
    const errors = await EventValidator.eventValidator(eventObject);

    if (errors === '') {
      if (eventObject.eventImageName === 'cameraDefault.png') {
        eventObject.eventImagePath = (`/uploads/default/${eventObject.eventImageName}`);
      } else {
        eventObject.eventImagePath = (`/uploads/${user._id}/events/${eventObject.eventImageName}`);
      }
      eventObject.dateCreated = date;
      return EventRepository.createEvent(user._id, eventObject);
    }
    throw new ServerError('There was an error creating event.', 400, errors);
  },

  async getEvent(eventId) {
    const query = {};

    if (eventId !== '') {
      query._id = eventId;
      query.deleted = false;
    }

    return EventRepository.getEvent(query);
  },

  async getEvents(userId, searchQuery, search) {
    let query = {};

    if (userId !== '') {
      query.user = userId;
    } else if (search === 'true') {
      const tempSearchQuery = searchQuery;
      const regex = new RegExp(tempSearchQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
      query = { eventName: regex };
    }
    query.deleted = false;

    return EventRepository.getEvents(query);
  },

  async updateEvent(user, parsedEventObject) {
    const eventObject = parsedEventObject;
    const errors = await EventValidator.eventValidator(eventObject);

    if (errors === '') {
      if (eventObject.location === undefined) {
        eventObject.location = {};
      }

      if ((eventObject.eventImagePath !== undefined) && (eventObject.eventImagePath !== (`/uploads/${user._id}/events/${eventObject.eventImageName}`))) {
        fs.remove(`${eventObject.eventImagePath.toString().substring(3)}`, (error) => {
          if (error) {
            throw new ServerError('eventController.updateEvent: removeImage', 400, error);
          }
        });
      }

      if (eventObject.eventImageName === 'cameraDefault.png') {
        eventObject.eventImagePath = (`/uploads/default/${eventObject.eventImageName}`);
      } else {
        eventObject.eventImagePath = (`/uploads/${user._id}/events/${eventObject.eventImageName}`);
      }

      return EventRepository.updateEvent(eventObject);
    }
    throw new ServerError('There was an error updating event.', 400, errors);
  },

  async deleteEvent(eventId) {
    return EventRepository.deleteEvent(eventId);
  },
};
