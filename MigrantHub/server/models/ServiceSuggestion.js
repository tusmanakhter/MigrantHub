const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const serviceSuggestionSchema = new Schema({
  serviceTitle: { type: String, required: true },
  serviceSummary: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  deleted: { type: Boolean, default: false },
  deletedDate: { type: Date, default: null },
});

module.exports = mongoose.model('ServiceSuggestion', serviceSuggestionSchema);
