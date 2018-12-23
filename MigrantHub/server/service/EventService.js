const fs = require('fs-extra');
const EventValidator = require('../validators/EventValidator');
const EventRepository = require('../repository/EventRepository');

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
    throw new Error('There was an error creating event.');
  },

  async getEvent(eventId) {
    const query = {};

    if (eventId !== '') {
      query._id = eventId;
      query.deleted = false;
    }

    return EventRepository.getEvent(query);
  },

  async getEvents(editOwner) {
    const query = {};

    if (editOwner !== '') {
      query.user = editOwner;
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
        fs.remove(`${eventObject.eventImagePath.toString().substring(3)}`, (err) => {
          if (err) {
            throw new Error('eventController.updateEvent: removeImage');
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
    throw new Error('There was an error updating event.');
  },

  async deleteEvent(eventId) {
    return EventRepository.deleteEvent(eventId);
  },
};
