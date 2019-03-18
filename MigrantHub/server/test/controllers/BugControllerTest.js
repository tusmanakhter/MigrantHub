var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var BugController = require('../../controllers/BugController')
var BugFactory = require('../factories/BugFactory');
var BugService = require('../../service/BugService');

describe('Bug controller', function () {
    let req = {
            body: BugFactory.validCreateBugData(),
            user: {
                _id: "test@test.com"
            },
        }

    it('should call createBug service with correct parameters from createBug controller', test(async function () {
        this.stub(BugService, 'createBug');
        await BugController.createBug(req.user, req.body);
        assert.calledWith(BugService.createBug, req.user, req.body);
    }));

});
