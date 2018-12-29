const UserAnswerRepository = require('../repository/UserAnswerRepository');
const QuestionRepository = require('../repository/QuestionRepository');

module.exports = {
  async addUserAnswer(userId, questionAnswer) {
    const query = { user: userId };

    const userAnswer = await UserAnswerRepository.getUserAnswer(query);
    const question = await QuestionRepository.getQuestion(questionAnswer.question);
    const answerOption = question.answerOptions.find(option => option.optionNumber
      === parseInt(questionAnswer.answerOption, 10));

    const questionAnswerObj = {
      question,
      answerOption,
    };

    if (!userAnswer) {
      return UserAnswerRepository.createUserAnswer(userId, questionAnswerObj);
    }
    return UserAnswerRepository.updateUserAnswer(userAnswer._id, questionAnswerObj);
  },
};
