
module.exports = {
  async getChatbotResponse(sessionPath, sessionClient, requestString) {
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

    // Send request and get result
    const responses = await sessionClient.detectIntent(request);
    const results = responses[0].queryResult;

    return results;
  },
};
