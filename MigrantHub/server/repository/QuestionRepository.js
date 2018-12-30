const { Question } = require('../models/questions/Question');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  getQuestion(questionId) {
    return Question.findOne({ _id: questionId }).exec()
      .then(event => Promise.resolve(event)).catch((error) => {
        throw new ServerError('There was an error retrieving question.', 400, error);
      });
  },
  getQuestions() {
    return Question.find().exec().then(event => Promise.resolve(event)).catch((error) => {
      throw new ServerError('There was an error retrieving questions.', 400, error);
    });
  },
};
