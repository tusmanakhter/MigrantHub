var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var EventRepository = require('../../repository/EventRepository');
var EventFactory = require('../factories/EventFactory');
var Event = require('../../models/Event');
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
        EventRepository.createEvent('user id', 'event object');
        assert.calledWith(Event.prototype.save);
    }));

    it('should throw error, since there was a error saving event', test(async function () {
        this.stub(Event.prototype, 'save').returns(Promise.reject({}));
        try {
            chai.expect(await EventRepository.createEvent(req.body)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb find to find all events', test(function () {
        this.stub(Event, 'find').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        EventRepository.getEvents({ 'user': 'test@hotmail.com', deleted: false });
        assert.calledWith(Event.find, { 'user': 'test@hotmail.com', deleted: false });
    }));

    it('should throw error, since there was a error getting all events', test(async function () {
        this.stub(Event, 'find').returns(Promise.reject({}));
        try {
            chai.expect(await EventRepository.getEvents({ 'user': 'test@hotmail.com', deleted: false })).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb findOne to findOne event', test(function () {
        this.stub(Event, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        EventRepository.getEvent({ _id: event._id, deleted: false });
        assert.calledWith(Event.findOne, { _id: event._id, deleted: false });
    }));

    it('should throw error, since there was a error getting a event', test(async function () {
        this.stub(Event, 'findOne').returns(Promise.reject({}));
        try {
            chai.expect(await EventRepository.getEvent({ _id: event._id, deleted: false })).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb findByIdAndUpdate to updateEvent', test(function () {
        this.stub(Event, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        EventRepository.updateEvent(req.body.eventDetails);
        let parsedEventObject = req.body.eventDetails;
        assert.calledWith(Event.findByIdAndUpdate, { _id: event._id}, parsedEventObject, { new: true });
    }));

    it('should throw error, since there was a error updating event', test(async function () {
        this.stub(Event, 'findByIdAndUpdate').returns(Promise.reject({}));
        try {
            chai.expect(await EventRepository.updateEvent(req.body.eventDetails)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should successfully call mongodb updateOne to deleteEvent', test(async function () {
        this.stub(Event, 'updateOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        this.stub(Date, 'now').returns('2018-12-19T00:32:22.749Z');
        EventRepository.deleteEvent(event._id);
        assert.calledWith(Event.updateOne, { _id: event._id }, { deleted: true, deletedDate: Date.now() });
    }));

    it('should throw error, since there was a error deleting event', test(async function () {
        this.stub(Event, 'updateOne').returns(Promise.reject({}));
        try {
            chai.expect(await EventRepository.deleteEvent(req.event._id)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));
});