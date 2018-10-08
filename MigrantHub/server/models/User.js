var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
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
    age: {type: Number, min: 0, required: true},
    gender: {type: String, required: true},
    nationality: {type: String, required: true},
    relationshipStatus: {type: String, required: true},
    status: {type: String, required: true},
    languages: [{
        name: {type: String, required: false},
        writingLevel: {type: String, required: false},
        speakingLevel: {type: String, required: false}
    }],
    writingLevel: {type: String, required: true},
    speakingLevel: {type: String, required: true},
    motherTongue: {type: String, required: true},
    family : [{
        age: {type: Number, min: 0, required: true},
        gender: {type: String, required: true},
        relationshipStatus: {type: String, required: true},
        relation: {type: String, required: true}
    }],
    educationLevel: {type: String, required: true},
    proficiencyExams: {
        ielts: {type: Boolean, required: false},
        french: {type: Boolean, required: false},
        others: {type: String, required: false}
    },
    jobStatus: {type: String, required: true},
    lookingForJob: {type: String, required: true},
    currentIncome: {type: String, required: false, min: 1000000},
    workExperience: [{
        title: {type: String, required: true},
        company: {type: String, required: true},
        years: {type: Number, required: false},
    }],
    settlingLocation: {type: String, required: true},
    settlingDuration: {type: Number, required: true},
    joiningReason: {type: String, required: true}
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


