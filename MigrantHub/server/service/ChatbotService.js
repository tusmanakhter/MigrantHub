const dialogflow = require('dialogflow');
const ChatbotRepository = require('../repository/ChatbotRepository');
const { dialogflowConfig, cloudConfig } = require('../config');

module.exports = {

  // Send a query to the dialogflow agent, and return the query result.
  async callChatbot(userId, requestString) {
    const sessionId = userId;

    // Create session
    const sessionClient = new dialogflow.SessionsClient(dialogflowConfig);
    const sessionPath = sessionClient.sessionPath(cloudConfig.projectId, sessionId);

    return ChatbotRepository.getChatbotResponse(sessionPath, sessionClient, requestString);
  },
};
