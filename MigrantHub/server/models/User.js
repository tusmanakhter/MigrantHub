var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const options = {discriminatorKey: 'type'};

var userSchema = new Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, options);

module.exports = mongoose.model('User', userSchema);