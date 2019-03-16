const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

const reviewSchema = new Schema({
  user: { type: String, required: true },
  serviceId: { type: String, required: true },
  rating: { type: Number, required: true },
  title: { type: String, required: false },
  comment: { type: String, required: true },
  time: { type: Date, default: Date.now, required: false },
  deleted: { type: Boolean, default: false },
  deletedDate: { type: Date, default: null },
});

reviewSchema.plugin(autoIncrement.plugin, 'Review');

module.exports = mongoose.model('Review', reviewSchema);
