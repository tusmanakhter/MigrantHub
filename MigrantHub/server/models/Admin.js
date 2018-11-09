const { Schema } = require('mongoose');
const User = require('./User');

const options = { discriminatorKey: 'type' };

const Admin = User.discriminator('admin',
  new Schema({
    authorized: { type: Boolean, required: true, default: false },
  }, options));

module.exports = Admin;
