const ChatbotService = require('../service/ChatbotService');

module.exports = {
  async callChatbot(userId, requestString) {
    return ChatbotService.callChatbot(userId, requestString);
  },
};
