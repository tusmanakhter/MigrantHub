const { Schema } = require('mongoose');
const User = require('./User');
const UserTypes = require('../lib/UserTypes');

const options = { discriminatorKey: 'type' };

const MigrantUser = User.discriminator(UserTypes.MIGRANT,
  new Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    address: { type: String, required: false },
    apartment: { type: String, required: false },
    city: { type: String, required: false },
    province: { type: String, required: false },
    postalCode: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    age: { type: Number, min: 0, required: false },
    gender: { type: String, required: false },
    nationality: { type: String, required: false },
    relationshipStatus: { type: String, required: false },
    status: { type: String, required: false },
    languages: [{
      name: { type: String, required: false },
      writingLevel: { type: String, required: false },
      speakingLevel: { type: String, required: false },
    }],
    writingLevel: { type: String, required: false },
    speakingLevel: { type: String, required: false },
    motherTongue: { type: String, required: false },
    family: [{
      age: { type: Number, min: 0, required: false },
      gender: { type: String, required: false },
      relationshipStatus: { type: String, required: false },
      relation: { type: String, required: false },
    }],
    educationLevel: { type: String, required: false },
    proficiencyExams: {
      ielts: { type: Boolean, required: false },
      french: { type: Boolean, required: false },
      others: { type: String, required: false },
    },
    jobStatus: { type: String, required: false },
    lookingForJob: { type: String, required: false },
    currentIncome: { type: String, required: false, min: 0 },
    workExperience: [{
      title: { type: String, required: false },
      company: { type: String, required: false },
      years: { type: Number, required: false },
    }],
    settlingLocation: { type: String, required: false },
    settlingDuration: { type: Number, required: false },
    joiningReason: { type: String, required: false },
    friendsList: [{
      friend_id: { type: String, default: '' },
      state: { type: String, enum: ['waiting', 'accepted', 'rejected', 'unfriended'], default: '' },
      lastUpdate: { type: Date, default: Date.now },
    }],
    facebookAuthentication: {
      type: {
        id: { type: String },
        token: { type: String },
      },
      select: false,
    },
    googleAuthentication: {
      type: {
        id: { type: String },
        token: { type: String },
      },
      select: false,
    },
  }, options));

module.exports = MigrantUser;
