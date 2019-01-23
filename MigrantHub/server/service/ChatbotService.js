const dialogflow = require('dialogflow');
const uuid = require('uuid');

module.exports = {

  // Send a query to the dialogflow agent, and return the query result.
  async callChatbot(requestString) {
    const projectId = 'migranthub';

    // Create unique identifier for session
    const sessionId = uuid.v4();

    // Create session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: requestString,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return result.fulfillmentText;
  },
};
