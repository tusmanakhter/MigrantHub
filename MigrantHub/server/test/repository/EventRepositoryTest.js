var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var EventRepository = require('../../repository/EventRepository');
var EventFactory = require('../factories/EventFactory');
var Event = require('../../models/Event');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Event Repository', function () {

    let req = {
            body: {
                eventDetails: EventFactory.validCreateEventData()
            },
        },
        event = {
            _id: "5bda52305ccfd051484ea790",
            email: "test@hotmail.com"
        };

    it('should successfully call mongodb save to createEvent', test(function () {
        this.stub(Event.prototype, 'save').returns(Promise.resolve({}));
        return chai.assert.isFulfilled(EventRepository.createEvent(req.body, {}), 'Event has been created.');
    }));

    it('should throw error, since there was a error saving event', test(function () {
        this.stub(Event.prototype, 'save').returns(Promise.reject({}));
        return chai.assert.isRejected(EventRepository.createEvent(req.body, {}), ServerError, 'There was an error saving event.');
    }));

    it('should successfully call mongodb find to find all events', test(function () {
        this.stub(Event, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        EventRepository.getEvents({ $text: { $search: /test/ }, deleted: false });
        assert.calledWith(Event.find, { $text: { $search: /test/ }, deleted: false });
    }));

    it('should throw error, since there was a error getting all events', test(function () {
        this.stub(Event, 'find').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(EventRepository.getEvents({ $text: { $search: /test/ }, deleted: false }), ServerError, 'There was an error retrieving events.');
    }));

    it('should successfully call mongodb findOne to findOne event', test(function () {
        this.stub(Event, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        EventRepository.getEvent({ _id: event._id, deleted: false });
        assert.calledWith(Event.findOne, { _id: event._id, deleted: false });
    }));

    it('should throw error, since there was a error getting a event', test(function () {
        this.stub(Event, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(EventRepository.getEvent({ _id: event._id, deleted: false }), ServerError, 'There was an error retrieving event.');
    }));

    it('should successfully call mongodb findByIdAndUpdate to updateEvent', test(function () {
        this.stub(Event, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        EventRepository.updateEvent(req.body.eventDetails);
        let parsedEventObject = req.body.eventDetails;
        assert.calledWith(Event.findByIdAndUpdate, { _id: event._id}, parsedEventObject, { new: true });
    }));

    it('should throw error, since there was a error updating event', test(function () {
        this.stub(Event, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(EventRepository.updateEvent(req.body.eventDetails), ServerError, 'There was an error updating event in db.');
    }));

    it('should successfully call mongodb updateOne to deleteEvent', test(function () {
        this.stub(Event, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        EventRepository.deleteEvent(event._id);
        assert.calledWith(Event.updateOne, { _id: event._id }, { deleted: true, deletedDate: Date.now() });
    }));

    it('should throw error, since there was a error deleting event', test(function () {
        this.stub(Event, 'updateOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(EventRepository.deleteEvent(event._id), ServerError, 'There was an error deleting event.');
    }));
});