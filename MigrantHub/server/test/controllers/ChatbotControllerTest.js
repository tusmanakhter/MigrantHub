var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var ChatbotControler = require('../../controllers/ChatbotController')
var ChatbotService = require('../../service/ChatbotService');

describe('Chatbot controller', function () {
    let req = {
        userId: "test@test.test",
        requestString: "Hello",
    };

    it('should call callChatbot service with correct parameters from Chatbot controller', test(async function () {
        this.stub(ChatbotService, 'callChatbot');
        await ChatbotControler.callChatbot(req.userId, req.requestString);
        assert.calledWith(ChatbotService.callChatbot, req.userId, req.requestString);
    }));
});