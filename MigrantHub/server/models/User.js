const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const options = { discriminatorKey: 'type' };

const userSchema = new Schema({
  _id: { type: String, required: true },
  localAuthentication: {
    type: {
      password: { type: String },
    },
    select: false,
  },
  email: { type: String, required: true },
  deleted: { type: Boolean, required: true, default: false },
  deletedDate: { type: Date, default: null },
}, options);

module.exports = mongoose.model('User', userSchema);
