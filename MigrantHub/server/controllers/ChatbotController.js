const ChatbotService = require('../service/ChatbotService');

module.exports = {
  async callChatbot(requestString) {
    return ChatbotService.callChatbot(requestString);
  },
};
