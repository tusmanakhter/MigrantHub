const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const savedJobSchema = new Schema({
  _id: { type: String, required: true },
  savedList: [{
    _id: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    deletedDate: { type: Date, default: null },
  }],  dateCreated: { type: Date, required: false },
});

module.exports = mongoose.model('SavedJob', savedJobSchema);
