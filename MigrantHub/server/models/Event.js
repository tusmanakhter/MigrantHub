const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const eventSchema = new Schema({
  user: { type: String, required: true },
  visibility: { type: String, required: true },
  eventName: { type: String, required: true },
  description: { type: String, required: true },

  location: {
    address: { type: String, required: false },
    apartment: { type: String, required: false },
    city: { type: String, required: false },
    province: { type: String, required: false },
    postalCode: { type: String, required: false },
    phoneNumber: { type: String, required: false },
  },

  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  repeat: { type: String, required: true },
  eventImagePath: { type: String, required: false },
  dateCreated: { type: Date, required: true },
  deleted: { type: Boolean, default: false },
  deletedDate: { type: Date, default: null },
  lastEditDate: { type: Date, default: null },
});

module.exports = mongoose.model('Event', eventSchema);
