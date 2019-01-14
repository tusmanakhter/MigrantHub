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
                search: true,
                searchQuery: 'test',
            },
        },
        event = {
            _id: "5bda52305ccfd051484ea790",
        };

    it('should call createEvent service with correct parameters from createEvent controller', test(async function () {
        this.stub(EventService, 'createEvent');
        await EventController.createEvent(req.user, req.body.eventDetails);
        assert.calledWith(EventService.createEvent, req.user, req.body.eventDetails);
    }));

    it('should call getEvents service with correct parameters from getEvents controller', test(async function () {
        this.stub(EventService, 'getEvents');
        await EventController.getEvents(req.query.editOwner, req.query.searchQuery, req.query.search);
        assert.calledWith(EventService.getEvents, req.query.editOwner, req.query.searchQuery, req.query.search);
    }));

    it('should call getEvent service with correct parameters from getEvent controller', test(async function () {
        this.stub(EventService, 'getEvent');
        await EventController.getEvent(event._id);
        assert.calledWith(EventService.getEvent, event._id);
    }));

    it('should call updateEvent service with correct parameters from updateEvent controller', test(async function () {
        this.stub(EventService, 'updateEvent');
        await EventController.updateEvent(req.body.eventDetails);
        assert.calledWith(EventService.updateEvent, req.body.eventDetails);
    }));

    it('should call deleteService service with with correct parameters from deleteService controller', test(async function () {
        this.stub(EventService, 'deleteEvent');
        await EventController.deleteEvent(event._id);
        assert.calledWith(EventService.deleteEvent, event._id);
    }));
});
