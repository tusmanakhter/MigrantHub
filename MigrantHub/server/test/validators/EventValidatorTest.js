var EventValidator = require('../../validators/EventValidator');
var chai = require('chai');
var assert = chai.assert;
var EventFactory = require('../factories/EventFactory');

describe('EventValidator()', function () {
    it('Validates create event data should return empty error string.', function () {
        let errors = EventValidator(EventFactory.validCreateEventData());
        assert.equal(errors, "");
    });

    it('Invalid create event data should return a string with all the errors', function () {
        var expectedErrors =
            "\nEvent name is required" +
            "\nDescription is required" +
            "\nAddress is required" + 
            "\nCity is required" + 
            "\nProvince is required" + 
            "\nPostal code is required" + 
            "\nPostal code should be in the format A1B 2E3" +
            "\nPhone number is required" + 
            "\nPhone number should be in the format (123) 456-7890" +
            "\nStart date is required" + 
            "\nEnd date is required" +
            "\nStart time is required" +
            "\nEnd time is required";

        let forcedErrors = EventValidator(EventFactory.emptyCreateEventData());
        assert.equal(forcedErrors, expectedErrors);
    });

    it('Invalid create event data should return a string with all the errors', function () {
        var expectedErrors =
            "\nDescription must be at least 10 characters" +
            "\nPostal code is invalid" +
            "\nPostal code should be in the format A1B 2E3" +
            "\nPhone number is invalid" +
            "\nPhone number should be in the format (123) 456-7890" +
            "\nStart date is invalid" +
            "\nEnd date is invalid" +
            "\nEnd time is invalid";

        let forcedErrors = EventValidator(EventFactory.invalidNumbersCreateEventData());
        assert.equal(forcedErrors, expectedErrors);
    });
});