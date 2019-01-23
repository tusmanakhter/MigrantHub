const dialogflow = require('dialogflow');
const ChatbotRepository = require('../repository/ChatbotRepository');

module.exports = {

  // Send a query to the dialogflow agent, and return the query result.
  async callChatbot(userId, requestString) {
    const projectId = 'migranthub';
    const sessionId = userId; 

    const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY;
    const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;

    const config = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail,
      },
    };

    // Create session
    const sessionClient = new dialogflow.SessionsClient(config);
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    return ChatbotRepository.getChatbotResponse(sessionPath, sessionClient, requestString);
  },
};
