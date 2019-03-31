var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BugService = require('../../service/BugService');
var BugRepository = require('../../repository/BugRepository');
var BugFactory = require('../factories/BugFactory');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Bug Service', function () {
    let req = {
        body: BugFactory.validBugData(),
        query: {
            _id: "5bda52305ccfd051484ea790",
        },
        params: {
            id: "5bda52305ccfd051484ea790"
        }
    },
    bug = {
        _id: "5bda52305ccfd051484ea790",
    };

    it('should call getBugs to retrieve all bugs from getBugs service', test(async function () {
        this.stub(BugRepository, 'getBugs').returns([]);
        await BugService.getBugs();
        assert.calledWith(BugRepository.getBugs);
    }));

    it('should call getBug repository with correct parameters from getBug service', test(async function () {
        this.stub(BugRepository, 'getBug').returns({ _id: '5bda52305ccfd051484ea790' });
        await BugService.getBug(bug._id);
        assert.calledWith(BugRepository.getBug, { _id: '5bda52305ccfd051484ea790' });
    }));
});
