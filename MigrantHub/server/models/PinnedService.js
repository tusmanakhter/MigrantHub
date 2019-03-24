const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const options = { discriminatorKey: 'type' };

const PinnedService = new Schema({
  _id: { type: String, required: true },
  pinnedList: [{
    serviceId: { type: String, default: '' },
    deleted: { type: Boolean, default: false },
  }],
}, options);

module.exports = mongoose.model('PinnedService', PinnedService);
