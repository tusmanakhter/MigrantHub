const QuestionService = require('../service/QuestionService');

module.exports = {
  async getQuestions(userId) {
    return QuestionService.getUnansweredQuestions(userId);
  },
};
