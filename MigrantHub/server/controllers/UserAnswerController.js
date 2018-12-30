const qs = require('qs');
const UserAnswerService = require('../service/UserAnswerService');

module.exports = {
  async addUserAnswer(userId, questionAnswer) {
    const parsedQuestionAnswerObject = qs.parse(questionAnswer);
    return UserAnswerService.addUserAnswer(userId, parsedQuestionAnswerObject);
  },
};
