var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var friendRequestSchema = new Schema({
    requestFrom: {type: String, required: true},
    requestTo: {type: String, required: true},
});

friendRequestSchema.plugin(autoIncrement.plugin, 'FriendRequest');

module.exports = mongoose.model('FriendRequest', friendRequestSchema);