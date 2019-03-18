const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bugSchema = new Schema({
  user: { type: String, required: true },
  bugName: { type: String, required: true },
  description: { type: String, required: true },
  dateCreated: { type: Date, required: true },
});

module.exports = mongoose.model('Bug', bugSchema);
