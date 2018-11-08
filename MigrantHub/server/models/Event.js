var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    creator: {type: String, required: true},
    visibility: {type: String, required : true},
    eventName: {type: String, required : true},
    description: {type: String, required : true},

    location: {
        address: {type: String, required: false},
        apartment: {type: String, required: false},
        city: {type: String, required: false},
        province: {type: String, required: false},
        postalCode: {type: String, required: false},
        phoneNumber: {type: String, required: false},
    },
    
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, required: true},
    timeStart: {type: String, required: true},
    secondsStart: {type: Number, required: true},
    timeEnd: {type: String, required: true},
    secondsEnd: {type: Number, required: true},
    repeat: {type: String, required : true}, 
    eventImagePath: { type: String, required: false },

}, { collection: 'Event' });

module.exports = mongoose.model('Event', eventSchema);



