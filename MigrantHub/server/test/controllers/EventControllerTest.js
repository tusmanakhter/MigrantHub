var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var EventController = require('../../controllers/EventController')
var EventFactory = require('../factories/EventFactory');
var EventService = require('../../service/EventService');

describe('Event controller', function () {
    let req = {
            body: {
                eventDetails: EventFactory.validCreateEventData()
            },
            user: {
                _id: "test@test.com"
            },
            query: {
                editOwner: "test@test.com",
            },
        },
        event = {
            _id: "5bda52305ccfd051484ea790",
        };

    it('should call createEvent service with correct parameters from createEvent controller', test(async function () {
        this.stub(EventService, 'createEvent');
        EventController.createEvent(req.user, req.body.eventDetails);
        assert.calledWith(await EventService.createEvent, req.user, req.body.eventDetails);
    }));

    it('should call getEvents service with correct parameters from getEvents controller', test(async function () {
        this.stub(EventService, 'getEvents');
        EventController.getEvents(req.query.editOwner);
        assert.calledWith(await EventService.getEvents, req.query.editOwner);
    }));

    it('should call getEvent service with correct parameters from getEvent controller', test(async function () {
        this.stub(EventService, 'getEvent');
        EventController.getEvent(event._id);
        assert.calledWith(await EventService.getEvent, event._id);
    }));

    it('should call updateEvent service with correct parameters from updateEvent controller', test(async function () {
        this.stub(EventService, 'updateEvent');
        EventController.updateEvent(req.body.eventDetails);
        assert.calledWith(await EventService.updateEvent, req.body.eventDetails);
    }));

    it('should call deleteService service with with correct parameters from deleteService controller', test(async function () {
        this.stub(EventService, 'deleteEvent');
        EventController.deleteEvent(event._id);
        assert.calledWith(await EventService.deleteEvent, event._id);
    }));
});
