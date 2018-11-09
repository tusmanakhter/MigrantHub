const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const friendRequestSchema = new Schema({
  requestFrom: { type: String, required: true },
  requestTo: { type: String, required: true },
});

friendRequestSchema.plugin(autoIncrement.plugin, 'FriendRequest');

module.exports = mongoose.model('FriendRequest', friendRequestSchema);
