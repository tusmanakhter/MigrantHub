const UserAnswerRepository = require('../repository/UserAnswerRepository');
const QuestionRepository = require('../repository/QuestionRepository');
const { ServerError } = require('../errors/ServerError');

module.exports = {
  async addUserAnswer(userId, questionAnswer) {
    const query = { user: userId };

    const userAnswer = await UserAnswerRepository.getUserAnswer(query);
    const question = await QuestionRepository.getQuestion(questionAnswer.question);

    let answerExists;
    if (userAnswer) {
      answerExists = userAnswer.questionAnswers
        .find(answer => answer.question._id.equals(question._id));
    } else {
      answerExists = false;
    }

    if (answerExists) {
      throw new ServerError('There was an error adding answer.', 400, ['answer already exists']);
    }

    const answerOption = question.answerOptions.find(option => option.optionNumber
      === parseInt(questionAnswer.answerOption, 10));

    const questionAnswerObj = {
      question: { _id: question._id, question: question.question },
      answerOption,
    };
    if (!userAnswer) {
      return UserAnswerRepository.createUserAnswer(userId, questionAnswerObj);
    }
    return UserAnswerRepository.updateUserAnswer(userAnswer._id, questionAnswerObj);
  },
};
