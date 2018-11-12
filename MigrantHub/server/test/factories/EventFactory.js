module.exports.validCreateEventData = function() {
    return {
        _id: "5bda52305ccfd051484ea790",
        creator: 'alex@alex.alex',
        visibility: 'public',
        eventName: 'My Awesome Event',
        description: 'Awesome Event Description',
        location : {
            address: '777 Awesome',
            apartment: '',
            city: 'Las Vegas',
            province: 'QC',
            postalCode: 'H1Z 8P2',
            phoneNumber: '(514) 123-1234'
        },
        dateStart: '2020-01-01',
        dateEnd:'2021-01-01',
        timeStart: '10:00',
        secondsStart: '36000',
        timeEnd: '22:00',
        secondsEnd: '79200',
        repeat: 'no', 
    };
};

module.exports.emptyCreateEventData = function() {
    return {
        creator: '',
        visibility: '',
        eventName: '',
        description: '',
        location : {
            address: '',
            apartment: '',
            city: '',
            province: '',
            postalCode: '',
            phoneNumber: ''
        },
        dateStart: '',
        dateEnd:'',
        timeStart: '',
        secondsStart: '',
        timeEnd: '',
        secondsEnd: '',
        repeat: '', 
    };
};

module.exports.invalidNumbersCreateEventData = function() {
    return {
        creator: 'alex@alex.alex',
        visibility: 'public',
        eventName: '123',
        description: '123',
        location : {
            address: '123',
            apartment: '',
            city: '123',
            province: 'QC',
            postalCode: '213',
            phoneNumber: '123',
        },
        dateStart: '2018-01-01',
        dateEnd:'2017-01-01',
        timeStart: '00:10',
        secondsStart: '600',
        timeEnd: '00:00',
        secondsEnd: '0',
        repeat: 'no', 
    };
};