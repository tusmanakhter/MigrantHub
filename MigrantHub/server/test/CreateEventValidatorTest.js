var CreateEventValidator = require('../validators/CreateEventValidator');
var chai = require('chai');
var assert = chai.assert;

const validCreateEventData = {
    creator: 'alex@alex.alex',
    visibility: 'public',
    eventName: 'My Awesome Event',
    description: 'Awesome Event Description',
    address: '777 Awesome',
    apartment: '',
    city: 'Las Vegas',
    province: 'QC',
    postalCode: 'H1Z 8P2',
    phoneNumber: '(514) 123-1234',
    dateStart: '2020-01-01',
    dateEnd:'2021-01-01',
    timeStart: '10:00',
    secondsStart: '36000',
    timeEnd: '22:00',
    secondsEnd: '79200',
    repeat: 'no', 
};

const emptyCreateEventData = {
    creator: '',
    visibility: '',
    eventName: '',
    description: '',
    address: '',
    apartment: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',
    dateStart: '',
    dateEnd:'',
    timeStart: '',
    secondsStart: '',
    timeEnd: '',
    secondsEnd: '',
    repeat: '', 
};

const invalidNumbersCreateEventData = {
    creator: 'alex@alex.alex',
    visibility: 'public',
    eventName: '123',
    description: '123',
    address: '123',
    apartment: '',
    city: '123',
    province: 'QC',
    postalCode: '213',
    phoneNumber: '123',
    dateStart: '2018-01-01',
    dateEnd:'2017-01-01',
    timeStart: '00:10',
    secondsStart: '600',
    timeEnd: '00:00',
    secondsEnd: '0',
    repeat: 'no', 
};

describe('CreateEventValidator()', function () {
    it('Validates create event data should return empty error string.', function () {

        console.log("Error free profile data")
        let errors = CreateEventValidator(validCreateEventData);
        assert.equal(errors, "");
    });
});

describe('CreateEventValidator()', function () {
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

        console.log("Error create event data, caused by empty fields")
        let forcedErrors = CreateEventValidator(emptyCreateEventData);
        assert.equal(forcedErrors, expectedErrors);
    });
});

    describe('CreateEventValidator()', function () {
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

            console.log("Error create event data, caused by invalid fields");
            let forcedErrors = CreateEventValidator(invalidNumbersCreateEventData);
            console.log(forcedErrors);
            assert.equal(forcedErrors, expectedErrors);
        });
});