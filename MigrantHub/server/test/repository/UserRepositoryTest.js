var { assert } = require('sinon');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
var User = require('../../models/User');
var AccountFactory = require('../factories/AccountFactory');
var UserRepository = require('../../repository/UserRepository');
var { ServerError } = require('../../errors/ServerError');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('business repository', function () {
    let req = {
        body: AccountFactory.validBusinessAccount(),
        user:{
            _id: "test@test.com"
        },
    };

    it('should successfully call mongodb findOne user', test(function () {
        this.stub(User, 'findOne').returns({exec: sinon.stub().returns(Promise.resolve({}))});
        UserRepository.getUser(req.user._id);
        assert.calledWith(User.findOne, { _id: req.user._id });
    }));

    it('should throw error, since there was a error findOne user', test(function () {
        this.stub(User, 'findOne').returns({exec: sinon.stub().returns(Promise.reject({}))});
        return chai.assert.isRejected(UserRepository.getUser(req.user._id), ServerError, 'There was an error retrieving user.');
    }));
});
