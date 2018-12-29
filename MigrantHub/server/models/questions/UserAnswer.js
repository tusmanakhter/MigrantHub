const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const AnswerSchema = require('./Answer');

const userAnswerSchema = new Schema({
  user: { type: String, required: true },
  questionAnswers: { type: [AnswerSchema], required: true },
});

module.exports = mongoose.model('UserAnswer', userAnswerSchema);
