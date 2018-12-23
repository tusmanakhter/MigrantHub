var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var EventService = require('../../service/EventService');
var EventRepository = require('../../repository/EventRepository');
var EventFactory = require('../factories/EventFactory');
var EventValidator = require('../../validators/EventValidator');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Event Service', function () {
    let req = {
            body: {
                eventDetails: EventFactory.validCreateEventData()
            },
            user: {
                _id: "test@test.com"
            },
            query: {
                _id: "5bda52305ccfd051484ea790",
                editOwner: "test@test.com",
            }
        },
        event = {
            _id: "5bda52305ccfd051484ea790",
            email: "test@hotmail.com"
        };

    it('should call createEvent repository with correct parameters from createEvent service', test(async function () {
        this.stub(EventRepository, 'createEvent');
        this.stub(EventValidator, 'eventValidator').returns('');
        EventService.createEvent(req.user, req.body.eventDetails);
        let tempEventObject = req.body.eventDetails;
        tempEventObject.eventImagePath = '/uploads/test@test.com/events/undefined';
        assert.calledWith(await EventRepository.createEvent, req.user._id, tempEventObject);
    }));

    it('should call createEvent repository with error in validation from createEvent service', test(async function () {
        this.stub(EventRepository, 'createEvent');
        this.stub(EventValidator, 'eventValidator').returns("error");
        try {
            chai.expect(await EventRepository.createEvent(req.user._id, req.body.eventDetails)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should call getEvents to retrieve a users searched events from getEvents service', test(async function () {
        this.stub(EventRepository, 'getEvents');
        EventService.getEvents(req.query.editOwner);
        assert.calledWith(await EventRepository.getEvents, { deleted: false, user: "test@test.com" });
    }));

    it('should call getEvents to retrieve all events from getEvents service', test(async function () {
        this.stub(EventRepository, 'getEvents');
        EventService.getEvents('');
        assert.calledWith(await EventRepository.getEvents, { deleted: false });
    }));

    it('should call getEvent repository with correct parameters from getEvent service', test(async function () {
        this.stub(EventRepository, 'getEvent');
        EventService.getEvent(event._id);
        assert.calledWith(await EventRepository.getEvent, { _id: "5bda52305ccfd051484ea790", deleted: false } );
    }));

    it('should call updateEvent repository with correct parameters from updateEvent service', test(async function () {
        this.stub(EventRepository, 'updateEvent');
        this.stub(EventValidator, 'eventValidator').returns('');
        EventService.updateEvent(req.user, req.body.eventDetails);
        let tempEventObject = req.body.eventDetails;
        tempEventObject.eventImagePath = "/uploads/test@test.com/events/undefined";
        assert.calledWith(await EventRepository.updateEvent, tempEventObject);
    }));

    it('should call updateEvent repository with error in validation from updateEvent service', test(async function () {
        this.stub(EventRepository, 'updateEvent');
        this.stub(EventValidator, 'eventValidator').returns("error");
        try {
            chai.expect(await EventRepository.updateEvent(req.body.eventDetails)).should.be.rejected;
        }catch(error){
            chai.expect(error, true);
        }
    }));

    it('should call deleteEvent repository from deleteEvent service', test(async function () {
        this.stub(EventRepository, 'deleteEvent');
        EventService.deleteEvent(event._id);
        assert.calledWith(await EventRepository.deleteEvent, event._id);
    }));
});