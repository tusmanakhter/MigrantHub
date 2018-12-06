const { Schema } = require('mongoose');
const User = require('./User');

const options = { discriminatorKey: 'type' };

const Admin = User.discriminator('admin',
  new Schema({
    authorized: { type: Boolean, required: true, default: false },
    rejected: { type: Boolean, required: true, default: false },
    rejectedDate: { type: Date, default: null },
  }, options));

module.exports = Admin;
