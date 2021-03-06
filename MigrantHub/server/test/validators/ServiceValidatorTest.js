var ServiceValidator = require('../../validators/ServiceValidator');
var chai = require('chai');
var assert = chai.assert;
var ServiceFactory = require('../factories/ServiceFactory');

describe('ServiceValidator()', function () {
    it('Validate service data should return empty error string.', async function () {

        let errors = await ServiceValidator.serviceValidator(ServiceFactory.validServiceData());
        assert.equal(errors, "");
    });
});

describe('ServiceValidator()', function () {
    it('Empty service data should return a string with all the errors', async function () {

        var expectedErrors =
            "\nService Title is empty" +
            "\nService Description is empty" +
            "\nService summary is empty" +
            "\nStart date is required" +
            "\nEnd date is required" +
            "\nAddress is required and empty" +
            "\nCity is required and empty" +
            "\nProvince is required and empty" +
            "\nPostal code is required and empty" +
            "\nPhone number is required and empty" +
            "\nService day is required and empty" +
            "\nService hour start time required and empty" +
            "\nService hour end time required and empty";

        let forcedErrors = await ServiceValidator.serviceValidator(ServiceFactory.emptyServiceData());
        assert.equal(forcedErrors, expectedErrors);
    });
});

describe('ServiceValidator()', function () {
    it('Invalid migrant profile data should return a string with all the errors', async function () {

        var expectedErrors =
            "\nPostal is should be in the format A1B 2E3" +
            "\nPhone number should be in the format (123) 456-7890" +
            "\nService hour start time should be in the format 13:57" +
            "\nService hour end time should be in the format 13:57";

        let forcedErrors = await ServiceValidator.serviceValidator(ServiceFactory.invalidServiceData());
        assert.equal(forcedErrors, expectedErrors);
    });
});