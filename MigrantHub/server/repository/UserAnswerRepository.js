const UserAnswer = require('../models/questions/UserAnswer');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  createUserAnswer(userId, questionAnswer) {
    const userAnswer = new UserAnswer();

    userAnswer.user = userId;
    userAnswer.questionAnswers = [questionAnswer];
    return userAnswer.save().then(() => Promise.resolve('Answer has been added.')).catch((error) => {
      throw new ServerError('There was an error adding answer.', 400, error);
    });
  },

  getUserAnswer(query) {
    return UserAnswer.findOne(query).exec().then(event => Promise.resolve(event)).catch((error) => {
      throw new ServerError('There was an error retrieving answers.', 400, error);
    });
  },

  updateUserAnswer(userAnswerId, questionAnswer) {
    return UserAnswer.findByIdAndUpdate({ _id: userAnswerId },
      { $push: { questionAnswers: questionAnswer } },
      { new: true }).exec()
      .then(() => Promise.resolve('Answer has been added.')).catch((error) => {
        throw new ServerError('There was an error adding answer.', 400, error);
      });
  },
};
