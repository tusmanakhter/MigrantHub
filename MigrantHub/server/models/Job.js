const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const jobSchema = new Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  positionType: { type: String, required: true },
  companyName: { type: String, required: false },
  contactName: { type: String, required: false },
  contactEmail: { type: String, required: false },
  contactPhone: { type: String, required: false },
  location: { type: String, required: false },
  salaryStart: { type: Number, min: 0, required: false },
  salaryEnd: { type: Number, min: 0, required: false },
  website: { type: String, required: false },
  dateCreated: { type: Date, required: false },
  deleted: { type: Boolean, default: false },
  deletedDate: { type: Date, default: null },
});

module.exports = mongoose.model('Job', jobSchema);
