var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var QuestionController = require('../../controllers/QuestionController')
var QuestionService = require('../../service/QuestionService');

describe('Question controller', function () {
    let req = {
      user: {
          _id: "test@test.com"
      },
    };

    it('should call getUnansweredQuestions service with correct parameters from getQuestions controller', test(async function () {
      this.stub(QuestionService, 'getUnansweredQuestions');
      await QuestionController.getQuestions(req.user._id);
      assert.calledWith(QuestionService.getUnansweredQuestions, req.user._id);
    }));
});
