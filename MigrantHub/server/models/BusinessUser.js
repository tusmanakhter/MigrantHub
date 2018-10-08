var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var businessUserSchema = new Schema({

  _id: {type: String, required: true},
  email: {type: String, required: true},
  corpId: {type: String, required: true},
  password: {type: String, required: true},
  confirmPassword: {type: String, required: true},
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
}, { collection: 'BusinessUser' });

var BusinessUser = module.exports = mongoose.model('BusinessUser', businessUserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}