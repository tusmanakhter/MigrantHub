const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const serviceSchema = new Schema({
  user: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  serviceDescription: { type: String, required: false },
  serviceSummary: { type: String, required: false },
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  acronym: { type: String, required: false },
  serviceDate: {
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
  },
  location: {
    address: { type: String, required: false },
    apartment: { type: String, required: false },
    city: { type: String, required: false },
    province: { type: String, required: false },
    postalCode: { type: String, required: false },
    metro: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    phoneNumber2: { type: String, required: false },
  },
  serviceHours: [{
    serviceDay: { type: String, required: false },
    startTime: { type: String, required: false },
    endTime: { type: String, required: false },
  }],
  openHours: { type: String, required: false },
  fax: { type: String, required: false },
  website: { type: String, required: false },
  email: { type: String, required: false },
  notes: { type: String, required: false },
  serviceImagePath: { type: String, required: false },
  dateCreated: { type: Date, required: false },
  deleted: { type: Boolean, default: false },
  deletedDate: { type: Date, default: null },
});

module.exports = mongoose.model('Service', serviceSchema);
