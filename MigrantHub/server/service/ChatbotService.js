const dialogflow = require('dialogflow');

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
				client_email: clientEmail
			}
		}
    
    // Create session
		const sessionClient = new dialogflow.SessionsClient(config)
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