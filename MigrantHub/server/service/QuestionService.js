const QuestionRepository = require('../repository/QuestionRepository');
const UserAnswerRepository = require('../repository/UserAnswerRepository');

module.exports = {
  async getUnansweredQuestions(userId) {
    const query = { user: userId };

    const userAnswer = await UserAnswerRepository.getUserAnswer(query);

    if (!userAnswer) {
      return QuestionRepository.getQuestions();
    }

    const answers = userAnswer.questionAnswers;
    const questions = await QuestionRepository.getQuestions();
    const filteredQuestions = questions.filter(question => !answers.some(item => item.question._id
      .equals(question._id)));
    return Promise.resolve(filteredQuestions);
  },
};
