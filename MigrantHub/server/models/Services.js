var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var serviceSchema = new Schema({
    email: {type: String, required: true},
    serviceTitle: {type: String, required: true},
    serviceDescription: {type: String, required: true},
    serviceSummary: {type: String, required: true},
    serviceDate: {
        startDate: {type: Date, required: false},
        endDate: {type: Date, required: false},
    },
    location: {
        address: {type: String, required: false},
        apartment: {type: String, required: false},
        city: {type: String, required: false},
        province: {type: String, required: false},
        postalCode: {type: String, required: false},
        phoneNumber: {type: String, required: false},
    },
    serviceHours: [{
        serviceDay: {type: String, required: false},
        startTime: {type: String, required: false},
        endTime: {type: String, required: false}
    }],
    serviceImagePath: { type: String, required: false },
    dateCreated: { type: Date, required: false },
    deleted: { type: Boolean, default: false},
    deletedDate: {type: Date, default: null}
}, { collection: 'Services' });
module.exports = mongoose.model('Services', serviceSchema);



