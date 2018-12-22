var { spy, stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var EventController = require('../../controllers/EventController')
var EventFactory = require('../factories/EventFactory');
var Event = require('../../models/Event');
var User = require('../../models/User');

describe('Event controller', function () {

    let req = {
        body: {
            eventDetails: EventFactory.validCreateEventData()
        },
        user: {
            _id: "test@test.com"
        },
        query: {
            _id: "5bda52305ccfd051484ea790",
            editOwner: "test@test.com"
        },
        params: {
            id: "5bda52305ccfd051484ea790"
        }
    },
    error = new Error({ error: "err" }),
    res = {};
    event = {
        _id: "5bda52305ccfd051484ea790",
        email: "test@test.com"
    },
    user = {
        _id: "5bda52305ccfd051484ea790",
        type: "migrant"
    },
    admin = {
        _id: "test@test.com",
        type: "admin"
    }

    beforeEach(function () {
        status = stub();
        send = spy();
        res = { send, status };
        status.returns(res);
    });

    it('should be able create a new event successfully if data is valid', test(function () {
        let expectedResult = EventFactory.validCreateEventData();
        this.stub(Event.prototype, 'save').yields(null, expectedResult);
        EventController.createEvent(req, res);
        assert.calledWith(Event.prototype.save);
        assert.calledWith(res.send, "Event has been created!");
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error creating event', test(function () {
        this.stub(Event.prototype, 'save').yields(error);
        EventController.createEvent(req, res);
        assert.calledWith(Event.prototype.save);
        assert.calledWith(res.send, "There was a error creating event.");
        assert.calledWith(res.status, 400);
    }));

    it('should successfully update event if no errors', test(function () {
        this.stub(Event, 'findByIdAndUpdate');
        EventController.updateEvent(req, res);
        assert.calledWith(Event.findByIdAndUpdate, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send, "Event updated successfully.");
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error updating event', test(function () {
        this.stub(Event, 'findByIdAndUpdate').yields(error);
        EventController.updateEvent(req, res);
        assert.calledWith(Event.findByIdAndUpdate, { _id: "5bda52305ccfd051484ea790" });
        assert.calledWith(res.send, "There was an error updating event.");
        assert.calledWith(res.status, 400);
    }));

    it('should return event if no error retrieving event data', test(function () {
        this.stub(Event, 'findOne').yields(null);
        EventController.getEventData(req, res);
        assert.calledWith(Event.findOne, { _id: "5bda52305ccfd051484ea790", deleted: false });
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error retrieving event data', test(function () {
        this.stub(Event, 'findOne').yields(error);
        EventController.getEventData(req, res);
        assert.calledWith(Event.findOne, { _id: "5bda52305ccfd051484ea790", deleted: false });
        assert.calledWith(res.send, "There was a error getting event.");
        assert.calledWith(res.status, 400);
    }));

    it('should return events if no error retrieving all events', test(function () {
        this.stub(Event, 'find').yields(null);
        EventController.viewEvents(req, res);
        assert.calledWith(Event.find, { creator: "test@test.com", deleted: false });
        assert.calledWith(res.status, 200);
    }));

    it('should return error events if error retrieving all events', test(function () {
        this.stub(Event, 'find').yields(error);
        EventController.viewEvents(req, res);
        assert.calledWith(Event.find, { creator: "test@test.com", deleted: false });
        assert.calledWith(res.send, "There was a error getting events.");
        assert.calledWith(res.status, 400);
    }));

    it('should delete a event', test(async function () {
        this.stub(Event, 'findOne').resolves(event);
        this.stub(User, 'findOne').returns(user);
        this.stub(Event, 'updateOne').yields(null);
        await EventController.deleteEvent(req, res);
        assert.calledWith(Event.updateOne, { _id: "5bda52305ccfd051484ea790" }, { deleted: true, deletedDate: Date.now() });
        assert.calledWith(res.send, "Event deleted successfully.");
        assert.calledWith(res.status, 200);
    }));

    it('should not delete event on error', test(async function () {
        this.stub(Event, 'findOne').resolves(event);
        this.stub(User, 'findOne').returns(user);
        this.stub(Event, 'updateOne').yields(error);
        await EventController.deleteEvent(req, res);
        assert.calledWith(Event.updateOne, { _id: "5bda52305ccfd051484ea790" }, { deleted: true, deletedDate: Date.now() });
        assert.calledWith(res.send, "There was an error deleting event.");
        assert.calledWith(res.status, 400);
    }));

    it('admin should be able to delete an event', test(async function () {
        this.stub(Event, 'findOne').resolves(event);
        this.stub(User, 'findOne').resolves(admin);
        this.stub(Event, 'updateOne').yields(null);
        EventController.deleteEvent(req, res);
        await EventController.deleteEvent(req, res);
        assert.calledWith(Event.updateOne, { _id: "5bda52305ccfd051484ea790" }, { deleted: true, deletedDate: Date.now() });
        assert.calledWith(res.send, "Event deleted successfully.");
        assert.calledWith(res.status, 200);
    }));

    it('should not delete event on error', test(async function () {
        this.stub(Event, 'findOne').returns(event);
        this.stub(User, 'findOne').returns(user);
        this.stub(Event, 'updateOne').yields(error);
        EventController.deleteEvent(req, res);
        await EventController.deleteEvent(req, res);
        assert.calledWith(Event.updateOne, { _id: "5bda52305ccfd051484ea790" }, { deleted: true, deletedDate: Date.now() });
        assert.calledWith(res.send, "There was an error deleting event.");
        assert.calledWith(res.status, 400);
    }));
});