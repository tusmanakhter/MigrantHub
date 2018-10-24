var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friendRequestSchema = new Schema({
    _id: {type: String, required: true},
    requestFrom: {type: String, required: true},
    requestTo: {type: String, required: true},
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);