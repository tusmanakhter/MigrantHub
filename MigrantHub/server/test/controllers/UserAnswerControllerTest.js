var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var UserAnswerController = require('../../controllers/UserAnswerController')
var UserAnswerService = require('../../service/UserAnswerService');

describe('User Answer controller', function () {
    let req = {
      body: {
          questionAnswer: {
            question: 1,
            answerOption: 1,
          }
      },
      user: {
          _id: "test@test.com"
      },
    };

    it('should call addUserAnswer service with correct parameters from addUserAnswer controller', test(async function () {
      this.stub(UserAnswerService, 'addUserAnswer');
      await UserAnswerController.addUserAnswer(req.user._id, req.body.questionAnswer);
      assert.calledWith(UserAnswerService.addUserAnswer, req.user._id, req.body.questionAnswer);
    }));
});
