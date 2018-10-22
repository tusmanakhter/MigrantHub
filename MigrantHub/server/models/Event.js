var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new Schema({
    _id: {type: String, required: true},

    creator: {},

    visibility: {type: String, required : true},
    eventName: {type: String, required : true},
    description: {type: String, required : true},
    address: {type: String, required : true},
    apartment: {type: String, required : true},
    city: {type: String, required : true},
    province: {type: String, required : true},
    postalCode: {type: String, required : true},
    phoneNumber: {type: String, required : true},
    dateStart: {type: Date, required: true},
    dateEnd: {type: Date, required: true},
    timeStart: {type: String, required: true},
    secondsStart: {type: Number, required: true},
    timeEnd: {type: String, required: true},
    secondsEnd: {type: Number, required: true},
    repeat: {type: String, required : true}, 


    
}, { collection: 'Event' });
module.exports = mongoose.model('Event', eventSchema);



