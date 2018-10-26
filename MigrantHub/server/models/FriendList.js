var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friendListSchema = new Schema({
    //_id: {type: String, required: false},
    requestFrom: {type: String, required: true},
    requestTo: {type: String, required: true}
});

module.exports = mongoose.model('FriendList', friendListSchema);