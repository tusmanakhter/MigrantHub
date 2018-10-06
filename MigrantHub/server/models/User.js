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
        ielts: Boolean,
        french: Boolean,
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
module.exports = mongoose.model('User', userSchema);



