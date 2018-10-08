var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var businessUserSchema = new Schema({
    _id: String,
    email: String,
    corpId: String,
    password: String,
    confirmPassword: String,
    firstName: String,
    lastName: String,
    address: String,
    apartment: String,
    city: String,
    province: String,
    postalCode: String,
    phoneNumber: String,
    nameOrganization: String,
    typeOrganization: String,
    nameDepartment: String,
    typeService: String,
    description: String,
}, { collection: 'BusinessUser' });
module.exports = mongoose.model('BusinessUser', userSchema);