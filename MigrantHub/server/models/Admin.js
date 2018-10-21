var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

const options = {discriminatorKey: 'type'};

var Admin = User.discriminator('Admin',
new Schema({
  authorized: {type: Boolean, required: true, default: false},
}, options));

module.exports = Admin;