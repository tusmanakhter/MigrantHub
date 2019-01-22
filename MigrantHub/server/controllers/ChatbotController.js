const qs = require('qs');
const multer = require('multer');
const fs = require('fs-extra');
const ChatbotService = require('../service/ChatbotService');

module.exports = {

  async callChatbot(requestString) {
    return ChatbotService.callChatbot(requestString);
  },
  
};
