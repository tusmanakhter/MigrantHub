var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

const options = {discriminatorKey: 'type'};

var BusinessUser = User.discriminator('Business',
new Schema({
  corpId: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  address: {type: String, required: true},
  apartment: {type: String, required: false},
  city: {type: String, required: true},
  province: {type: String, required: true},
  postalCode: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  organizationName: {type: String, required: true},
  orgType: {type: String, required: true},
  department: {type: String, required: true},
  serviceType: {type: String, required: true},
  description: {type: String, required: true},
}, options));

module.exports = BusinessUser;