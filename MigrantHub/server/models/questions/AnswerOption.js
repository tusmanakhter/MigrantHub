const { Schema } = require('mongoose');

const answerOptionSchema = new Schema({
  optionNumber: { type: Number },
  answerBody: { type: String, minlength: 1, maxlength: 200 },
});

module.exports = answerOptionSchema;
