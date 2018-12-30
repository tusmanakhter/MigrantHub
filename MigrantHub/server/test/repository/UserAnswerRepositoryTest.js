var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var UserAnswer = require('../../models/questions/UserAnswer');
var UserAnswerRepository = require('../../repository/UserAnswerRepository');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('UserAnswer repository', function () {
  let req = {
    body: {
        questionAnswer: {
          question: 1,
          answerOption: 1,
        },
        userAnswerId: 1
    },
    user:{
        _id: "test@test.com"
    },
  };

  it('should create a userAnswer and return promise', test(function () {
      this.stub(UserAnswer.prototype, 'save').returns(Promise.resolve({}));
      return chai.assert.isFulfilled(UserAnswerRepository.createUserAnswer(req.user._id, req.body.questionAnswer), 'UserAnswer has been created.');
  }));

    it('should throw error, since there was a error saving userAnswer', test(function () {
        this.stub(UserAnswer.prototype, 'save').returns(Promise.reject({}));
        return chai.assert.isRejected(UserAnswerRepository.createUserAnswer(req.user._id, req.body.questionAnswer), ServerError, 'There was an error adding answer.');
    }));

    it('should successfully call mongodb findOne userAnswer', test(function () {
        this.stub(UserAnswer, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        UserAnswerRepository.getUserAnswer({ _id: req.user._id });
        assert.calledWith(UserAnswer.findOne, { _id: req.user._id });
    }));

    it('should throw error, since there was a error findOne userAnswer', test(function () {
        this.stub(UserAnswer, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(UserAnswerRepository.getUserAnswer(req.user._id), ServerError, 'There was an error retrieving answers.');
    }));

    it('should successfully call mongodb findOne userAnswer', test(function () {
        this.stub(UserAnswer, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        UserAnswerRepository.updateUserAnswer(req.body.userAnswerId, req.body.questionAnswer);
        assert.calledWith(UserAnswer.findByIdAndUpdate, { _id: req.body.userAnswerId });
    }));

    it('should throw error, since there was a error findByIdAndUpdate userAnswer', test(function () {
        this.stub(UserAnswer, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(UserAnswerRepository.updateUserAnswer(req.body.userAnswerId, req.body.questionAnswer), ServerError, 'There was an error adding answer.');
    }));
});
