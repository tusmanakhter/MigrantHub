var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BugRepository = require('../../repository/BugRepository');
var BugFactory = require('../factories/BugFactory');
var Bug = require('../../models/Bug');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Bug Repository', function () {
    let req = {
            body: BugFactory.validBugData(),
            user:{
                _id: "test@test.com"
            },
        },
        bug = {
            _id: "5bda52305ccfd051484ea790",
        };

    it('should successfully call mongodb find to findBugs', test(function () {
        this.stub(Bug, 'find').returns({ exec: sinon.stub().returns(Promise.resolve({}))});
        BugRepository.getBugs();
        assert.calledWith(Bug.find);
    }));

    it('should throw error, since there was a error getting all Bugs', test(function () {
        this.stub(Bug, 'find').returns({ exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(BugRepository.getBugs(), ServerError, 'There was an error retrieving bugs.');
    }));

    it('should successfully call mongodb findOne to findOneBug', test(function () {
        this.stub(Bug, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        BugRepository.getBug({ _id: bug._id });
        assert.calledWith(Bug.findOne, { _id: bug._id });
    }));

    it('should throw error, since there was a error getting bug', test(function () {
        this.stub(Bug, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(BugRepository.getBug({ _id: bug._id }), ServerError, 'There was an error retrieving bug.');
    }));

    it('should successfully call mongodb findOne bug', test(function () {
        this.stub(Bug, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        BugRepository.updateBug(bug._id, req.body);
        assert.calledWith(Bug.findByIdAndUpdate, { _id: bug._id });
    }));
  
    it('should throw error, since there was an error finding bug', test(function () {
        this.stub(Bug, 'findByIdAndUpdate').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(BugRepository.updateBug(bug._i, req.body), ServerError, 'There was an error updating bug.');
    }));
});