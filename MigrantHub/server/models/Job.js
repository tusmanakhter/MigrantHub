const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const jobSchema = new Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  positionType: { type: String, required: true },
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  location: { type: String, required: true },
  website: { type: String, required: false },
  dateCreated: { type: Date, required: true },
  deleted: { type: Boolean, default: false },
  deletedDate: { type: Date, default: null },
});

module.exports = mongoose.model('Job', jobSchema);
