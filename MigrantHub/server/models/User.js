var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const options = {discriminatorKey: 'type'};

var userSchema = new Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    deleted: {type: Boolean, required: true, default: false},
    deletedDate: {type: Date, default: null}
}, options);

module.exports = mongoose.model('User', userSchema);