const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const reviewServiceSchema = new Schema({
  user: { type: String, required: true },
  serviceId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  time: { type: Date, default: Date.now, required: false },
});

reviewServiceSchema.plugin(autoIncrement.plugin, 'ReviewService');

module.exports = mongoose.model('ReviewService', reviewServiceSchema);
