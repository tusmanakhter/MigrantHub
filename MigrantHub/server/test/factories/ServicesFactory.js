module.exports.validServiceData = function() {
    return {
        _id: "5bda52305ccfd051484ea790",
        email : "test@hotmail.com",
        serviceTitle : "My First Service",
        serviceSummary : "In reasonable compliment favourable is connection dispatched in terminated.",
        serviceDescription : "Way nor furnished sir procuring therefore but. Warmth far manner myself active are cannot called.",
        serviceDate : {
            startDate : "2020-11-01",
            endDate : "2021-02-01"
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
};

module.exports.emptyServiceData = function() {
    return {
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
};

module.exports.invalidServiceData = function() {
    return {
        email : "test@hotmail.com",
        serviceTitle : "My First Service",
        serviceSummary : "In reasonable compliment favourable is connection dispatched in terminated.",
        serviceDescription : "Way nor furnished sir procuring therefore but. Warmth far manner myself active are cannot called.",
        serviceDate : {
            startDate : "2022-11-01",
            endDate : "2024-02-01"
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
};
