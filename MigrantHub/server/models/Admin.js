var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

const options = {discriminatorKey: 'type'};

var Admin = User.discriminator('admin',
new Schema({
  authorized: {type: Boolean, required: true, default: false},
  rejected: {type: Boolean, required: true, default: false},
  rejectedDate: {type: Date, default: null}
}, options));

module.exports = Admin;