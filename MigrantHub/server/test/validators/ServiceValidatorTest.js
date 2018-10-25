var ServiceValidator = require('../../validators/ServiceValidator');
var chai = require('chai');
var assert = chai.assert;

const validServiceData = {
    email : "test@hotmail.com",
    serviceTitle : "My First Service",
    serviceSummary : "In reasonable compliment favourable is connection dispatched in terminated.",
    serviceDescription : "Way nor furnished sir procuring therefore but. Warmth far manner myself active are cannot called.",
    serviceDate : {
        startDate : "2018-11-01",
        endDate : "2019-02-01"
    },
    location : {
        address : "1455 Boulevard de Maisonneuve O",
        apartment : "",
        city : "Montreal",
        province : "QC",
        postalCode : "H3G 1M8",
        phoneNumber : "(514) 848-2424"
    },
    serviceHours : [
        {
            serviceDay : "monday",
            startTime : "08:00",
            endTime : "17:00"
        },
    ],
};

const emptyServiceData = {
    email : "",
    serviceTitle : "",
    serviceSummary : "",
    serviceDescription : "",
    serviceImagePath : "",
    serviceDate : {
        startDate : "",
        endDate : ""
    },
    location : {
        address : "",
        apartment : "",
        city : "",
        province : "",
        postalCode : "",
        phoneNumber : ""
    },
    serviceHours : [
        {
            serviceDay : "",
            startTime : "",
            endTime : ""
        },
    ],
};

const invalidServiceData = {
    email : "test@hotmail.com",
    serviceTitle : "My First Service",
    serviceSummary : "In reasonable compliment favourable is connection dispatched in terminated. Do esteem object we called father excuse remove. So dear real on like more it. Laughing for two families addition expenses surprise the. If sincerity he to curiosity arranging. Learn taken terms be as. Scarcely mrs produced too removing new old.   Kindness to he horrible reserved ye. Effect twenty indeed beyond for not had county. The use him without greatly can private. Increasing it unpleasant no of contrasted no continuing. Nothing colonel my no removed in weather. It dissimilar in up devonshire inhabiting. ",
    serviceDescription : "Way nor furnished sir procuring therefore but. Warmth far manner myself active are cannot called. Set her half end girl rich met. Me allowance departure an curiosity ye. In no talking address excited it conduct. Husbands debating replying overcame blessing he it me to domestic. \n\nOf friendship on inhabiting diminution discovered as. Did friendly eat breeding building few nor. Object he barton no effect played valley afford. Period so to oppose we little seeing or branch. Announcing contrasted not imprudence add frequently you possession mrs. Period saw his houses square and misery. Hour had held lain give yet. \n\nHim boisterous invitation dispatched had connection inhabiting projection. By mutual an mr danger garret edward an. Diverted as strictly exertion addition no disposal by stanhill. This call wife do so sigh no gate felt. You and abode spite order get. Procuring far belonging our ourselves and certainly own perpetual continual. It elsewhere of sometimes or my certainty. Lain no as five or at high. Everything travelling set how law literature. ",
    serviceDate : {
        startDate : "2018-11-01",
        endDate : "2019-02-01"
    },
    location : {
        address : "1455 Boulevard de Maisonneuve O",
        apartment : "",
        city : "Montreal",
        province : "QC",
        postalCode : "H3G 1MP",
        phoneNumber : "(514) 848-24AA"
    },
    serviceHours : [
        {
            serviceDay : "monday",
            startTime : "088:00",
            endTime : "178:00"
        },
    ],
};

describe('ServiceValidator()', function () {
    it('Validate service data should return empty error string.', function () {

        let errors = ServiceValidator(validServiceData);
        assert.equal(errors, "");
    });
});

describe('ServiceValidator()', function () {
    it('Empty service data should return a string with all the errors', function () {

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

        let forcedErrors = ServiceValidator(emptyServiceData);
        assert.equal(forcedErrors, expectedErrors);
    });
});

describe('ServiceValidator()', function () {
    it('Invalid migrant profile data should return a string with all the errors', function () {

        var expectedErrors =
            "\nPostal is should be in the format A1B 2E3" +
            "\nPhone number should be in the format (123) 456-7890" +
            "\nService hour start time should be in the format 13:57" +
            "\nService hour end time should be in the format 13:57";

        let forcedErrors = ServiceValidator(invalidServiceData);
        assert.equal(forcedErrors, expectedErrors);
    });
});