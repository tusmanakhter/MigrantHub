const { Schema } = require('mongoose');
const { QuestionSchema } = require('./Question');
const AnswerOptionSchema = require('./AnswerOption');

const answerSchema = new Schema({
  question: { type: QuestionSchema, required: true },
  answerOption: { type: AnswerOptionSchema, required: true },
});

module.exports = answerSchema;
