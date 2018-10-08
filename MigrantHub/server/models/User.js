var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    _id: String,
    email: String,
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
    age: Number,
    gender: String,
    nationality: String,
    relationshipStatus: String,
    status: String,
    languages: [{
        name: String,
        writingLevel: String,
        speakingLevel: String
    }],
    writingLevel: String,
    speakingLevel: String,
    motherTongue: String,
    family : [{
        age: Number,
        gender: String,
        relationshipStatus: String,
        relation: String
    }],
    educationLevel: String,
    proficiencyExams: {
        ielts: String,
        french: String,
        others: String
    },
    jobStatus: String,
    lookingForJob: String,
    currentIncome: String,
    workExperience: [{
        title: String,
        company: String,
        years: Number,
    }],
    settlingLocation: String,
    settlingDuration: Number,
    joiningReason: String
}, { collection: 'User' });
//module.exports = mongoose.model('User', userSchema);

var User = module.exports = mongoose.model('User', UserSchema);

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


