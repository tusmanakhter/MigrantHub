var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BugController = require('../../controllers/BugController')
var BugFactory = require('../factories/BugFactory');
var BugService = require('../../service/BugService');

describe('Bug controller', function () {
    let req = {
            body: BugFactory.validBugData(),
            user: {
                _id: "test@test.com"
            },
        },
        bug = {
            _id: "5bda52305ccfd051484ea790",
        };

    it('should call createBug service with correct parameters from createBug controller', test(async function () {
        this.stub(BugService, 'createBug');
        await BugController.createBug(req.user, req.body);
        assert.calledWith(BugService.createBug, req.user, req.body);
    }));

    it('should call getBugs service with correct parameters from getBugs controller', test(async function () {
        this.stub(BugService, 'getBugs');
        await BugController.getBugs();
        assert.calledWith(BugService.getBugs);
    }));

    it('should call getBug service with correct parameters from getBug controller', test(async function () {
        this.stub(BugService, 'getBug');
        await BugController.getBug(bug._id);
        assert.calledWith(BugService.getBug, bug._id);
    }));

    it('should call updateBug service with correct parameters.', test(async function () {
        this.stub(BugService, 'updateBug');
        await BugController.updateBug(bug._id, req.body);
        assert.calledWith(BugService.updateBug, bug._id, req.body);
    }));
});
