var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friendListSchema = new Schema({
    requestFrom: {type: String, required: true},
    requestTo: {type: String, required: true}
});

module.exports = mongoose.model('FriendList', friendListSchema);