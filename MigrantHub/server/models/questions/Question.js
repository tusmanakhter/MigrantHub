const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const AnswerOptionSchema = require('./AnswerOption');

const questionSchema = new Schema({
  question: { type: String, required: true },
  answerOptions: { type: [AnswerOptionSchema], default: undefined },
});

module.exports = {
  Question: mongoose.model('Question', questionSchema),
  QuestionSchema: questionSchema,
};
