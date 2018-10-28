var { spy, stub, assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var EventController = require('../../controllers/eventController')
var EventFactory = require('../factories/EventFactory');
var Event = require('../../models/Event');

describe('Event controller', function () {

    let req = {
            body: {
                eventDetails: EventFactory.validCreateEventData()
            },
            user: {
                _id: "test@test.com"
            }
        },
        error = new Error({ error: "err" }),
        res = {};

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
        assert.calledWith(res.send, "Event has been added!");
        assert.calledWith(res.status, 200);
    }));

    it('should return error message if error creating event', test(function () {
        this.stub(Event.prototype, 'save').yields(error);
        EventController.createEvent(req, res);
        assert.calledWith(Event.prototype.save);
        assert.calledWith(res.send, "There was a error saving event.");
        assert.calledWith(res.status, 400);
    }));
});