const fs = require('fs-extra');
const EventValidator = require('../validators/EventValidator');
const EventRepository = require('../repository/EventRepository');
const { ServerError } = require('../errors/ServerError');
const SavedEventRepository = require('../repository/SavedEventRepository');

module.exports = {

  async createEvent(user, parsedEventObject) {
    const eventObject = parsedEventObject;
    const date = new Date();
    const errors = await EventValidator.eventValidator(eventObject);

    if (errors === '') {
      if (eventObject.eventImageName === 'montrealCity.png') {
        eventObject.eventImagePath = (`/uploads/default/${eventObject.eventImageName}`);
      } else {
        eventObject.eventImagePath = (`/uploads/${user._id}/events/${eventObject.eventImageName}`);
      }
      eventObject.dateCreated = date;
      return EventRepository.createEvent(user._id, eventObject);
    }
    throw new ServerError('There was an error creating event.', 400, errors);
  },

  async getEvent(user, eventId) {
    const query = {};

    if (eventId !== '') {
      query._id = eventId;
      query.deleted = false;
    }

    const event = await EventRepository.getEvent(query);
    const foundEvent = event.toObject();
    const foundSavedEvent = await SavedEventRepository.getSavedEvent(user._id, event._id);

    if (!foundSavedEvent) {
      foundEvent.savedEvent = false;
    } else {
      const foundSavedEventState = foundSavedEvent
        .savedList.filter(item => item._id === String(event._id));
      if (foundSavedEventState[0].deleted === true) {
        foundEvent.savedEvent = false;
      } else {
        foundEvent.savedEvent = true;
      }
    }
    return Promise.resolve(foundEvent);
  },

  async getEvents(user, userId, searchQuery, search, offset, limit) {
    let query = {};

    if (userId !== '') {
      query.user = userId;
    } else if (search === 'true') {
      query = ({ $text: { $search: searchQuery } });
    }
    query.deleted = false;

    let events = await EventRepository.getEvents(query, search, offset, limit);
    events = await events.map(async (event) => {
      const foundEvent = event.toObject();
      const foundSavedEvent = await SavedEventRepository.getSavedEvent(user._id, event._id);

      if (!foundSavedEvent) {
        foundEvent.savedEvent = false;
      } else {
        const foundSavedEventState = foundSavedEvent
          .savedList.filter(item => item._id === String(event._id));
        if (foundSavedEventState[0].deleted === true) {
          foundEvent.savedEvent = false;
        } else {
          foundEvent.savedEvent = true;
        }
      }
      return foundEvent;
    });
    return Promise.all(events);
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

      if (eventObject.eventImageName === 'montrealCity.png') {
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
