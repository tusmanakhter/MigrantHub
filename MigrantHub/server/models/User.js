const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const options = { discriminatorKey: 'type' };

const userSchema = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, options);

module.exports = mongoose.model('User', userSchema);
